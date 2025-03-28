import React from 'react';

export const AlgoriseSpinner: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="600" height="600">
      <style>
        {`
          @keyframes rotate {
            0% { transform: rotateX(-30deg) rotateY(0deg); }
            100% { transform: rotateX(-30deg) rotateY(360deg); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3)); }
            50% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6)); }
          }
          
          .cube-wrapper {
            transform-style: preserve-3d;
            transform-origin: 100px 100px;
            animation: rotate 4s infinite linear, bounce 2s infinite ease-in-out, glow 3s infinite;
          }
          
          .shadow {
            fill: rgba(0, 0, 0, 0.2);
            transform-origin: center;
            animation: shadow-move 2s infinite ease-in-out;
          }
          
          @keyframes shadow-move {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(0.8); opacity: 0.2; }
          }
          
          .particles circle {
            transform-origin: center;
            animation: particle-float 2s infinite ease-out;
            opacity: 0;
          }
          
          .particles circle:nth-child(2) { animation-delay: 0.4s; }
          .particles circle:nth-child(3) { animation-delay: 0.8s; }
          .particles circle:nth-child(4) { animation-delay: 1.2s; }
          .particles circle:nth-child(5) { animation-delay: 1.6s; }
          
          @keyframes particle-float {
            0% { transform: translate(0, 0) scale(0); opacity: 0; }
            20% { opacity: 0.8; }
            100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0; }
          }
          
          .icon {
            transform-origin: 100px 100px;
            animation: icon-float 3s infinite ease-out;
            opacity: 0;
          }
          
          .magnifier {
            animation-delay: 0.2s;
            --tx: 35px;
            --ty: -40px;
            --rot: 20deg;
          }
          
          .book {
            animation-delay: 1.0s;
            --tx: -40px;
            --ty: -30px;
            --rot: -15deg;
          }
          
          .price-tag {
            animation-delay: 1.8s;
            --tx: 45px;
            --ty: -25px;
            --rot: 10deg;
          }
          
          .message {
            animation-delay: 2.6s;
            --tx: -25px;
            --ty: -45px;
            --rot: -5deg;
          }
          
          .chart {
            animation-delay: 0.7s;
            --tx: 20px;
            --ty: -50px;
            --rot: 5deg;
          }
          
          @keyframes icon-float {
            0% { 
              transform: translate(0, 0) scale(0) rotate(0deg); 
              opacity: 0;
            }
            10%, 70% { 
              opacity: 0.95;
            }
            100% { 
              transform: translate(var(--tx), var(--ty)) scale(0.8) rotate(var(--rot)); 
              opacity: 0;
            }
          }
          
          /* Algorise text animation */
          .algorise-text {
            font-family: 'Arial', sans-serif;
            font-weight: bold;
            fill: white;
            font-size: 14px;
          }
          
          .i-dot {
            fill: #333;
            transform-origin: center;
            animation: i-dot-animation 10.5s infinite ease-in-out;
          }
          
          @keyframes i-dot-animation {
            0%, 100% { 
              fill: #00E5E5;
            }
            33% { 
              fill: #BB00FF;
            }
            66% { 
              fill: #FFBB00;
            }
          }
        `}
      </style>
      
      {/* Shadow */}
      <ellipse className="shadow" cx="100" cy="150" rx="35" ry="10" />
      
      {/* Algorise text with individual letters to remove the dot from "i" */}
      <text x="70" y="170" className="algorise-text">A</text>
      <text x="80" y="170" className="algorise-text">l</text>
      <text x="84" y="170" className="algorise-text">g</text>
      <text x="93" y="170" className="algorise-text">o</text>
      <text x="102" y="170" className="algorise-text">r</text>
      <text x="108" y="170" className="algorise-text">ı</text>
      <text x="112" y="170" className="algorise-text">s</text>
      <text x="119" y="170" className="algorise-text">e</text>
      
      {/* Animated dot for the "i" */}
      <circle className="i-dot" cx="110" cy="160" r="1.2" />
      
      {/* 3D Cube */}
      <g className="cube-wrapper">
        {/* Isometric Cube - 3 visible faces */}
        {/* Top face - Cyan */}
        <path d="M100,70 L140,90 L100,110 L60,90 Z" fill="#00E5E5" />
        
        {/* Right face - Yellow/Orange */}
        <path d="M100,110 L140,90 L140,130 L100,150 Z" fill="#FFBB00" />
        
        {/* Left face - Purple */}
        <path d="M100,110 L100,150 L60,130 L60,90 Z" fill="#BB00FF" />
        
        {/* Subtle highlight edges */}
        <path d="M100,70 L140,90 L100,110 M100,110 L60,90 L100,70" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M100,110 L140,90 L140,130 M140,130 L100,150 L100,110" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M100,110 L100,150 L60,130 M60,130 L60,90 L100,110" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
      </g>
      
      {/* Particles */}
      <g className="particles">
        <circle fill="#00E5E5" cx="100" cy="100" r="3" style={{ ['--tx' as string]: '30px', ['--ty' as string]: '-20px' }} />
        <circle fill="#BB00FF" cx="100" cy="100" r="2" style={{ ['--tx' as string]: '-25px', ['--ty' as string]: '-30px' }} />
        <circle fill="#FFBB00" cx="100" cy="100" r="2.5" style={{ ['--tx' as string]: '40px', ['--ty' as string]: '-10px' }} />
        <circle fill="#00E5E5" cx="100" cy="100" r="1.5" style={{ ['--tx' as string]: '-15px', ['--ty' as string]: '-40px' }} />
        <circle fill="#FFBB00" cx="100" cy="100" r="2" style={{ ['--tx' as string]: '20px', ['--ty' as string]: '-35px' }} />
      </g>
      
      {/* Icon: Magnifying Glass */}
      <g className="icon magnifier">
        <circle cx="100" cy="100" r="8" fill="none" stroke="#00E5E5" strokeWidth="2" />
        <line x1="107" y1="107" x2="113" y2="113" stroke="#00E5E5" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* Icon: Book */}
      <g className="icon book">
        <path d="M92,95 L92,110 L112,110 L112,95 L102,90 L92,95 Z" fill="#BB00FF" />
        <path d="M102,90 L102,105" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
        <path d="M95,97 L99,97 M95,100 L109,100 M95,103 L109,103 M95,106 L109,106" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
      </g>
      
      {/* Icon: Price Tag */}
      <g className="icon price-tag">
        <path d="M97,95 L110,95 L110,105 L97,105 L93,100 Z" fill="#FFBB00" />
        <text x="101.5" y="102" fontFamily="Arial" fontSize="8" fill="white" textAnchor="middle">$</text>
      </g>
      
      {/* Icon: Message Bubble */}
      <g className="icon message">
        <path d="M95,95 C92,95 90,97 90,100 C90,103 92,105 95,105 L105,105 C108,105 110,103 110,100 C110,97 108,95 105,95 Z" fill="#00E5E5" />
        <circle cx="97" cy="100" r="1" fill="white" />
        <circle cx="100" cy="100" r="1" fill="white" />
        <circle cx="103" cy="100" r="1" fill="white" />
      </g>
      
      {/* Icon: Chart */}
      <g className="icon chart">
        <rect x="93" y="95" width="15" height="12" rx="1" fill="#BB00FF" stroke="white" strokeWidth="0.5" />
        <line x1="95" y1="100" x2="98" y2="97" stroke="white" strokeWidth="1" />
        <line x1="98" y1="97" x2="101" y2="102" stroke="white" strokeWidth="1" />
        <line x1="101" y1="102" x2="104" y2="99" stroke="white" strokeWidth="1" />
        <line x1="104" y1="99" x2="107" y2="96" stroke="white" strokeWidth="1" />
      </g>
    </svg>
  );
};

export default AlgoriseSpinner; 