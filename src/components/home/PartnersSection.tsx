import React from 'react';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PartnersSection: React.FC = () => {
  // Données des partenaires avec logos locaux
  const partners = [
    { 
      name: 'Ministère de la Santé', 
      logo: '/partenaires/1.png',
      size: 'h-20',
      description: 'Partenaire institutionnel officiel'
    },
    { 
      name: 'Ordre des Pharmaciens du Bénin', 
      logo: '/partenaires/2.jpg',
      size: 'h-20',
      description: 'Certification professionnelle'
    },
    { 
      name: 'Union Béninoise de Pharmaciens (U.B.PHAR)', 
      logo: '/partenaires/3.png',
      size: 'h-20',
      description: 'Distribution de produits pharmaceutiques'
    },
    { 
      name: 'AESPHAB', 
      logo: '/partenaires/4.jpg',
      size: 'h-20',
      description: 'Association des Étudiants en Pharmacie'
    }
  ];

  const certifications = [
    {
      title: "Conformité RGPD",
      description: "Données sécurisées selon les normes européennes",
      color: "from-green-600 to-green-700"
    },
    {
      title: "ISO 27001",
      description: "Sécurité des systèmes d'information",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Agrément Ministériel",
      description: "Autorisé par le Ministère de la Santé du Bénin",
      color: "from-green-500 to-green-600"
    }
  ];

  // Configuration du carrousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-green-50 to-orange-50 border-2 border-green-200 text-green-700 text-sm font-semibold mb-4 shadow-md">
            <Building2 className="w-4 h-4 mr-2" />
            Nos partenaires
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ils nous <span className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">font confiance</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les institutions qui nous accompagnent dans notre mission
          </p>
        </div>

        {/* Carrousel des partenaires */}
        <div className="relative px-8 mb-16">
          <Slider {...sliderSettings}>
            {partners.map((partner) => (
              <div key={partner.name} className="px-2 outline-none">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 h-full mx-2">
                  <div className="flex flex-col items-center h-full">
                    <div className="flex items-center justify-center mb-4 h-20 w-full">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className={`${partner.size} w-auto max-w-full max-h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300`}
                        loading="lazy"
                        title={partner.name}
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 text-center mb-1 line-clamp-1">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-gray-500 text-center line-clamp-2">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Certifications et <span className="text-green-600">agréments</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              PharmaciEfficace respecte les plus hauts standards de sécurité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${cert.color} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {cert.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Composants personnalisés pour les flèches de navigation
const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors`}
      style={{ ...style, right: '-40px' }}
      onClick={onClick}
    >
      <ChevronRight className="text-gray-700 w-5 h-5" />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors`}
      style={{ ...style, left: '-40px' }}
      onClick={onClick}
    >
      <ChevronLeft className="text-gray-700 w-5 h-5" />
    </div>
  );
};

export default PartnersSection;