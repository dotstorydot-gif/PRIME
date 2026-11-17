import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useStore } from '../../context/StoreContext';
import CustomDropdown from '../../components/CustomDropdown';
import { ROOMS, getRoom } from './data/rooms';

gsap.registerPlugin(ScrollTrigger);

// Three.js is split into its own chunk, downloaded only on this page.
const sceneImport = () => import('./scene/ShowroomScene');
const ShowroomScene = lazy(sceneImport);
const LoadingVeil = lazy(() => sceneImport().then((m) => ({ default: m.LoadingVeil })));

const ROOM_OPTIONS = ROOMS.map((r) => ({ value: r.id, label: r.name }));

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fn = () => setReduced(mq.matches);
    mq.addEventListener?.('change', fn);
    return () => mq.removeEventListener?.('change', fn);
  }, []);
  return reduced;
}

export default function ExperiencePage() {
  const { formatEGP, viewProduct } = useStore();
  const reducedMotion = useReducedMotion();
  const [webgl] = useState(hasWebGL);
  const [lowPower] = useState(
    () => (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 900) || (navigator.deviceMemory && navigator.deviceMemory < 4)
  );
  const container = useRef(null);
  const progressRef = useRef(0);
  const [roomId, setRoomId] = useState(ROOMS[0].id);
  const room = getRoom(roomId);
  const last = room.stops.length - 1;
  const [stop, setStop] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Real catalogue data only: name + formatted price for every piece placed in any room.
  const products = useMemo(() => {
    const out = {};
    ROOMS.flatMap((r) => r.products).forEach(({ id }) => {
      const p = PRODUCTS.find((x) => x.id === id);
      if (p) out[id] = { name: p.name, price: formatEGP(p.price, p.priceUnit) };
    });
    return out;
  }, [formatEGP]);

  useEffect(() => {
    if (!webgl) return;
    const st = ScrollTrigger.create({
      trigger: container.current,
      start: 'top top',
      end: 'bottom bottom',
      snap: reducedMotion ? 1 / last : { snapTo: 1 / last, duration: { min: 0.4, max: 1.1 }, delay: 0.12, ease: 'power2.inOut' },
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const s = Math.round(self.progress * last);
        setStop((prev) => (prev === s ? prev : s));
      },
    });
    return () => st.kill();
  }, [webgl, reducedMotion, last, roomId]);

  // close the info panel when the camera moves on, or the room changes
  useEffect(() => setSelectedId(null), [stop, roomId]);

  useEffect(() => {
    // always enter at the doorway, never mid-walk from a restored scroll position
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.cursor = '';
      if ('scrollRestoration' in history) history.scrollRestoration = 'auto';
    };
  }, []);

  const changeRoom = (id) => {
    if (id === roomId) return;
    progressRef.current = 0;
    setStop(0);
    setHoveredId(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
    setRoomId(id);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  const onHover = useCallback((id) => setHoveredId(id), []);
  const onSelect = useCallback((id) => setSelectedId(id), []);

  const goTo = (i) => {
    const el = container.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((el.offsetHeight - window.innerHeight) * i) / last, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const current = room.stops[Math.min(stop, last)];
  const caption = current.focus ? products[current.focus]?.name : current.caption;

  if (!webgl) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4EEE5] px-6 pt-24 text-center">
        <div>
          <h1 className="font-serif text-3xl text-[#1d2743]">Explore Our Spaces</h1>
          <p className="mt-3 text-sm text-[#1C1A18]/70">This browser can't display the 3D showroom. Please try a recent version of Chrome, Safari or Edge.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4EEE5]">
      <section ref={container} className="relative" style={{ height: `${room.stops.length * 100}vh` }}>
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <Suspense fallback={<div className="h-full w-full bg-[#F4EEE5]" />}>
            <ShowroomScene
              room={room}
              progressRef={progressRef}
              reducedMotion={reducedMotion}
              lowPower={lowPower}
              products={products}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onHover={onHover}
              onSelect={onSelect}
              onView={viewProduct}
            />
            <LoadingVeil />
          </Suspense>

          {/* Room switcher */}
          <div className="absolute left-5 top-24 z-20 md:left-12 md:top-28">
            <CustomDropdown
              labelPrefix="Room"
              value={roomId}
              onChange={changeRoom}
              options={ROOM_OPTIONS}
              align="left"
              className="rounded-sm bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur"
            />
          </div>

          {/* Title, fades once the walk begins */}
          <div
            className={`pointer-events-none absolute inset-x-0 top-40 text-center transition-opacity duration-700 md:top-32 ${stop === 0 ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#8A6A45]">Experience Our Furniture</p>
            <h1 key={room.id} className="mt-3 font-serif text-4xl text-[#1d2743] animate-fadeIn md:text-6xl">The {room.name}</h1>
          </div>

          {/* Caption */}
          <div className="pointer-events-none absolute bottom-8 left-5 md:bottom-10 md:left-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A6A45]">
              {room.name} · {String(stop + 1).padStart(2, '0')} / {String(room.stops.length).padStart(2, '0')}
            </p>
            <p key={`${room.id}-${caption}`} className="mt-1 font-serif text-2xl text-[#1d2743] animate-fadeIn md:text-3xl">{caption}</p>
          </div>

          {stop === 0 ? (
            <p className="pointer-events-none absolute bottom-8 right-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#1d2743]/70 md:bottom-10 md:right-12">
              Scroll to walk through <ArrowDown size={12} className="motion-safe:animate-bounce" />
            </p>
          ) : (
            <p className="pointer-events-none absolute bottom-8 right-5 hidden text-[10px] uppercase tracking-[0.25em] text-[#1d2743]/70 md:bottom-10 md:right-12 md:block">
              Select any Prime piece
            </p>
          )}

          <nav aria-label="Walkthrough" className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-3 md:right-8">
            {room.stops.map((s, i) => (
              <button
                key={`${room.id}-${i}`}
                onClick={() => goTo(i)}
                aria-label={s.focus ? `Go to ${products[s.focus]?.name}` : 'Go to room overview'}
                aria-current={i === stop}
                className={`h-2.5 w-2.5 rounded-full border border-[#1d2743] transition ${i === stop ? 'scale-125 bg-[#1d2743]' : 'bg-white/40'}`}
              />
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
