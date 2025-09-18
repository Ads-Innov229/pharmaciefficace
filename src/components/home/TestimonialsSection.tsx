import React, { useState, useMemo, memo, useCallback, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, MapPin, Building2, Play } from 'lucide-react';

// Types
interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  pharmacy: string;
  location: string;
  image: string;
  rating: number;
  results: string;
  color: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
  isNext?: boolean;
  isPrev?: boolean;
}

// Données locales pour les témoignages
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Depuis que nous utilisons PharmaciEfficace, la satisfaction de nos clients a augmenté de 40%. Les sondages anonymes nous permettent d'identifier rapidement les points à améliorer.",
    author: "Dr. Aïchatou Bello",
    role: "Pharmacienne responsable",
    pharmacy: "Pharmacie du Progrès",
    location: "Cotonou, Bénin",
    image: "/images/testimonials/1.jpg",
    rating: 5,
    results: "Satisfaction client: +40% en 6 mois",
    color: "from-green-600 to-green-700"
  },
  {
    id: 2,
    quote: "L'outil de gestion d'équipe est révolutionnaire. Nous pouvons maintenant suivre les retours de notre personnel en temps réel et améliorer notre organisation interne.",
    author: "Mamadou Bello",
    role: "Directeur",
    pharmacy: "Pharmacie Centrale",
    location: "Porto-Novo, Bénin", 
    image: "/images/testimonials/2.jpg",
    rating: 5,
    results: "Efficacité équipe: +35%",
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 3,
    quote: "Les tableaux de bord sont très intuitifs. Nous exportons nos rapports chaque semaine pour analyser les tendances. C'est un vrai plus pour la gestion.",
    author: "Fatimata Zossou",
    role: "Pharmacienne",
    pharmacy: "Pharmacie de l'Espoir",
    location: "Parakou, Bénin",
    image: "/images/testimonials/3.jpg",
    rating: 5,
    results: "Optimisation processus: +50%",
    color: "from-green-500 to-green-600"
  },
  {
    id: 4,
    quote: "Excellent support client, très réactif. L'équipe comprend bien les enjeux des pharmacies au Bénin. La formation a été parfaite.",
    author: "Jean-Baptiste Adjahoué",
    role: "Pharmacien",
    pharmacy: "Pharmacie Santé Plus",
    location: "Abomey-Calavi, Bénin",
    image: "/images/testimonials/4.jpg",
    rating: 5,
    results: "Formation équipe réussie",
    color: "from-orange-600 to-orange-700"
  },
  {
    id: 5,
    quote: "Nous gérons 3 pharmacies à Cotonou avec PharmaciEfficace. La vue consolidée nous permet de comparer les performances et d'harmoniser nos pratiques entre nos différentes succursales.",
    author: "Dr. Aminata Soglo",
    role: "Directrice Générale",
    pharmacy: "Groupe Santé du Bénin",
    location: "Cotonou, Bénin",
    image: "/images/testimonials/5.jpg",
    rating: 5,
    results: "3 pharmacies optimisées",
    color: "from-green-700 to-green-800"
  }
];

// Composant de carte de témoignage optimisé
const TestimonialCard = memo<TestimonialCardProps>(({ 
  testimonial, 
  isActive,
  isNext = false,
  isPrev = false
}) => {
  const ratingStars = useMemo(() => 
    Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
        aria-hidden="true"
      />
    ))
  , [testimonial.rating]);

  const cardClasses = useMemo(() => {
    const base = "absolute inset-0 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-500 ease-out overflow-hidden";
    
    if (isActive) return `${base} opacity-100 translate-x-0 scale-100 z-10`;
    if (isNext) return `${base} opacity-0 translate-x-full scale-95 z-0`;
    if (isPrev) return `${base} opacity-0 -translate-x-full scale-95 z-0`;
    return `${base} opacity-0 scale-95 z-0`;
  }, [isActive, isNext, isPrev]);

  return (
    <div className={cardClasses}>
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <Quote className="w-8 h-8 text-gray-100 mb-4" />
          <blockquote className="text-gray-700 mb-6 italic">"{testimonial.quote}"</blockquote>
          
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white shadow-md">
              <img 
                src={testimonial.image} 
                alt={testimonial.author}
                className="w-full h-full object-cover"
                loading="lazy"
                width={48}
                height={48}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-avatar.jpg';
                }}
              />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-2" aria-label={`Note: ${testimonial.rating} étoiles`}>
              {ratingStars}
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{testimonial.pharmacy}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{testimonial.location}</span>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${testimonial.color} text-white`}>
            {testimonial.results}
          </div>
        </div>
      </div>
    </div>
  );
});
TestimonialCard.displayName = 'TestimonialCard';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const totalTestimonials = TESTIMONIALS.length;
  const ANIMATION_DURATION = 5000; // 5 seconds
  
  // Navigation functions
  const nextTestimonial = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % totalTestimonials);
    setProgress(0);
  }, [totalTestimonials]);
  
  const prevTestimonial = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + totalTestimonials) % totalTestimonials);
    setProgress(0);
  }, [totalTestimonials]);
  
  const goToTestimonial = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    setIsAutoPlaying(true);
  }, []);
  
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);
  
  // Touch event handlers with proper null checks
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.targetTouches[0];
    if (touch) {
      setTouchStart(touch.clientX);
    }
  }, []);
  
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.targetTouches[0];
    if (touch) {
      setTouchEnd(touch.clientX);
    }
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 50) nextTestimonial();
    if (touchStart - touchEnd < -50) prevTestimonial();
  }, [nextTestimonial, prevTestimonial, touchEnd, touchStart]);
  
  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const startTime = Date.now();
    let animationFrameId: number;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / ANIMATION_DURATION) * 100, 100);
      
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        nextTestimonial();
      } else {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateProgress);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoPlaying, nextTestimonial]);
  
  // Get visible testimonials with memoization
  const visibleTestimonials = useMemo(() => {
    if (TESTIMONIALS.length === 0) return [];
    
    const prevIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    const nextIndex = (currentIndex + 1) % totalTestimonials;
    
    const prevTestimonial = TESTIMONIALS[prevIndex] || TESTIMONIALS[0];
    const currentTestimonial = TESTIMONIALS[currentIndex] || TESTIMONIALS[0];
    const nextTestimonial = TESTIMONIALS[nextIndex] || TESTIMONIALS[0];
    
    return [
      { 
        testimonial: prevTestimonial, 
        isActive: false, 
        isPrev: true, 
        isNext: false 
      },
      { 
        testimonial: currentTestimonial, 
        isActive: true, 
        isPrev: false, 
        isNext: false 
      },
      { 
        testimonial: nextTestimonial, 
        isActive: false, 
        isPrev: false, 
        isNext: true 
      }
    ].filter(Boolean);
  }, [currentIndex, totalTestimonials]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextTestimonial();
      if (e.key === 'ArrowLeft') prevTestimonial();
      if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextTestimonial, prevTestimonial, toggleAutoPlay]);
  
  return (
    <section className="py-16 bg-gray-50" id="temoignages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ce que disent nos <span className="text-green-600">clients</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment PharmaciEfficace transforme la gestion des pharmacies au Bénin
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 w-10 h-10 items-center justify-center rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-50 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 w-10 h-10 items-center justify-center rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-50 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Slider Container */}
          <div 
            ref={sliderRef}
            className="relative h-[500px] overflow-hidden rounded-2xl bg-white shadow-lg"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-live="polite"
            aria-atomic="true"
          >
            {visibleTestimonials.map((item) => {
              if (!item || !item.testimonial) return null;
              const { testimonial, isActive, isNext, isPrev } = item;
              return (
                <TestimonialCard 
                  key={`${testimonial.id}-${isActive ? 'active' : isNext ? 'next' : 'prev'}`}
                  testimonial={testimonial}
                  isActive={!!isActive}
                  isNext={!!isNext}
                  isPrev={!!isPrev}
                />
              );
            })}
            
            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent z-10">
              <div className="flex items-center justify-center space-x-2 mb-3">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-green-600 w-6' : 'bg-gray-200 hover:bg-gray-400'
                    }`}
                    aria-label={`Aller au témoignage ${index + 1}`}
                    aria-current={index === currentIndex ? 'step' : undefined}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={toggleAutoPlay}
                  className="p-2 text-gray-500 hover:text-green-600 transition-colors rounded-full hover:bg-gray-100"
                  aria-label={isAutoPlaying ? 'Mettre en pause' : 'Lecture automatique'}
                >
                  {isAutoPlaying ? (
                    <div className="flex items-center justify-center w-5 h-5">
                      <div className="w-1 h-4 bg-current mx-0.5"></div>
                      <div className="w-1 h-4 bg-current mx-0.5"></div>
                    </div>
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
                
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-orange-500 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={Math.round(progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
                  />
                </div>
              </div>
            </div>
            {/* Auto-play toggle button */}
            <button
              onClick={toggleAutoPlay}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 group border border-gray-200 z-20"
              aria-label={isAutoPlaying ? "Arrêter la lecture automatique" : "Démarrer la lecture automatique"}
            >
              {isAutoPlaying ? (
                <div className="flex items-center justify-center w-4 h-4">
                  <div className="w-1 h-3 bg-gray-600 mx-0.5"></div>
                  <div className="w-1 h-3 bg-gray-600 mx-0.5"></div>
                </div>
              ) : (
                <Play className="w-4 h-4 text-gray-600 group-hover:text-gray-900 ml-0.5" />
              )}
            </button>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-green-500 to-orange-500 w-6' 
                    : 'bg-gray-200 hover:bg-gray-300 w-2'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
                aria-current={index === currentIndex ? 'step' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(TestimonialsSection);