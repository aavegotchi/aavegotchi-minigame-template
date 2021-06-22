export const eyes = {
  happy: `<g class="gotchi-eyeColor">
    <path d="M23 26V25V24H22H21V25V26H22H23Z"></path>
    <path d="M25 24H26H27V23V22H26H25H24H23V23V24H24H25Z"></path>
    <path d="M27 26H28H29V25V24H28H27V25V26Z"></path>
    <path d="M41 26H42H43V25V24H42H41V25V26Z"></path>
    <path d="M39 24H40H41V23V22H40H39H38H37V23V24H38H39Z"></path>
    <path d="M35 24V25V26H36H37V25V24H36H35Z"></path>
  </g>`,
  sleeping: `<g class="gotchi-eyeColor">
    <path d="M23 26H22H21V27V28H22H23V27V26Z"></path>
    <path d="M29 27V26H28H27V27V28H28H29V27Z"></path>
    <path d="M25 28H24H23V29V30H24H25H26H27V29V28H26H25Z"></path>
    <path d="M43 28V27V26H42H41V27V28H42H43Z"></path>
    <path d="M37 27V26H36H35V27V28H36H37V27Z"></path>
    <path d="M37 30H38H39H40H41V29V28H40H39H38H37V29V30Z"></path>
  </g>`,

  mad: `<g class="gotchi-eyeColor">
    <path d="M29 27V26H28H27V27V28H28H29V27Z"></path>
    <path d="M27 24H26H25V25V26H26H27V25V24Z"></path>
    <path d="M25 22H24H23V23V24H24H25V23V22Z"></path>
    <path d="M37 27V26H36H35V27V28H36H37V27Z"></path>
    <path d="M39 26V25V24H38H37V25V26H38H39Z"></path>
    <path d="M41 24V23V22H40H39V23V24H40H41Z"></path>
  </g>
  `,
};

export const mouths = {
  neutral: `<g class="gotchi-primary-mouth">
    <path d="M33 34h-4v2h6v-2h-1z" />
   </g>`,
};

export const defaultGotchi =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <style>.gotchi-primary{fill:#64438E;}.gotchi-secondary{fill:#EDD3FD;}.gotchi-cheek{fill:#F696C6;}.gotchi-eyeColor{fill:#64438E;}.gotchi-primary-mouth{fill:#64438E;}.gotchi-sleeves-up{display:none;}.gotchi-handsUp{display:none;}.gotchi-handsDownOpen{display:none;}.gotchi-handsDownClosed{display:block}
svg {
  animation-name:down;
  animation-duration:0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-timing-function: steps(1);
}

.gotchi-shadow {
  animation: up 0.5s infinite linear steps(2);
   animation-name:up;
   animation-duration:0.5s;
   animation-iteration-count: infinite;
   animation-timing-function: linear;
   animation-timing-function: steps(2);
}

.gotchi-wearable {
  animation-name:down;
  animation-duration:0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-timing-function: steps(1);
}
.gotchi-handsDownClosed, .gotchi-handsUp, .gotchi-handsDownOpen, .gotchi-handsDownClosed, .gotchi-body, .gotchi-eyeColor, .gotchi-collateral, .gotchi-cheek, .gotchi-primary-mouth, .gotchi-wearable, .gotchi-sleeves   {
   animation-name:down;
   animation-duration:0.5s;
   animation-iteration-count: infinite;
   animation-timing-function: linear;
   animation-timing-function: steps(2);
}
.wearable-hand {
  animation-name:down !important;
  animation-duration:0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-timing-function: steps(2);
}
@keyframes downHands {
  from {
    transform: translate(0px, -4px);
  }
 to {
    transform: translate(0px, -3px);
  }
}
@keyframes up {
  from {
    transform: translate(0px, 0);
  }
 to {
    transform: translate(0px, -1px);
  }
}
@keyframes down {
 from {
   transform: translate(0px, 0);
    }
 to {
      transform: translate(0px, 1px);
    }
    }</style>
  <g class="gotchi-bg">
    <defs fill="#fff">
      <pattern id="a" patternUnits="userSpaceOnUse" width="4" height="4">
        <path d="M0 0h1v1H0zm2 2h1v1H2z" />
      </pattern>
      <pattern id="b" patternUnits="userSpaceOnUse" x="0" y="0" width="2" height="2">
        <path d="M0 0h1v1H0z" />
      </pattern>
      <pattern id="c" patternUnits="userSpaceOnUse" x="-2" y="0" width="8" height="1">
        <path d="M0 0h1v1H0zm2 0h1v1H2zm2 0h1v1H4z" />
      </pattern>
      <pattern id="d" patternUnits="userSpaceOnUse" x="0" y="0" width="4" height="4">
        <path d="M0 0h1v1H0zm0 2h1v1H0zm1 0V1h1v1zm1 0h1v1H2zm0-1h1V0H2zm1 2h1v1H3z" />
      </pattern>
      <pattern id="e" patternUnits="userSpaceOnUse" width="64" height="32">
        <path d="M4 4h1v1H4zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1zm7 0h1v1h-1z" />
        <path fill="url(#a)" d="M0 8h64v7H0z" />
        <path fill="url(#b)" d="M0 16h64v1H0z" />
        <path fill="url(#c)" d="M0 18h64v1H0z" />
        <path fill="url(#b)" d="M22 18h15v1H22zM0 20h64v3H0z" />
        <path fill="url(#d)" d="M0 24h64v8H0z" />
      </pattern>
      <mask id="f">
        <path fill="url(#e)" d="M0 0h64v32H0z" />
      </mask>
    </defs>
    <path fill="#fff" d="M0 0h64v32H0z" />
    <path fill="#dea8ff" class="gotchi-secondary" mask="url(#f)" d="M0 0h64v32H0z" />
    <path fill="#dea8ff" class="gotchi-secondary" d="M0 32h64v32H0z" />
    <path mask="url(#f)" fill="#fff" transform="matrix(1 0 0 -1 0 64)" d="M0 0h64v32H0z" />
  </g>
  <g class="gotchi-body">
    <g class="gotchi-primary">
      <path d="M21 12h2v-2h-4v2h1z" />
      <path d="M19 14v-2h-2v2h1zm6-4h2V8h-4v2h1z" />
      <path d="M29 8h8V6H27v2h1zm16 6h2v-2h-2v1z" />
      <path d="M48 14h-1v39h-2v2h4V14zm-11-4h4V8h-4v1z" />
      <path d="M41 12h4v-2h-4v1zM17 53V14h-2v41h4v-2h-1z" />
      <path d="M24 51h-5v2h5v-1z" />
      <path d="M27 53h-3v2h5v-2h-1zm18-2h-5v2h5v-1z" />
      <path d="M35 51h-6v2h6v-1z" />
      <path d="M38 53h-3v2h5v-2h-1z" />
    </g>
    <g class="gotchi-secondary">
      <path d="M18 43v6h2v-1h2v1h2v2h-5v2h-2V14h2v1h-1v26z" />
      <path d="M27 51h-3v2h5v-2h-1zm11 0h-3v2h5v-2h-1z" />
      <path d="M35 49h-2v-1h-2v1h-2v2h6v-1zM25 11h2v-1h-4v1h1zm-4 2h2v-1h-4v1h1zm24 31v5h-1v-1h-2v1h-2v2h5v2h2V14h-2v29z" />
      <path d="M37 8H27v1h5v1h5V9zm8 4h-4v2h4v-1z" />
      <path d="M41 10h-4v2h4v-1z" />
    </g>
    <path d="M44 14h-3v-2h-4v-2h-5V9h-5v2h-4v2h-4v2h-1v34h2v-1h2v1h2v2h5v-2h2v-1h2v1h2v2h5v-2h2v-1h2v1h1V14z" fill="#fff" />
  </g>
  <path class="gotchi-cheek" d="M21 32v2h2v-2h-1zm21 0h-1v2h2v-2z" />
  <g class="gotchi-primary-mouth">
    <path d="M29 32h-2v2h2v-1z" />
    <path d="M33 34h-4v2h6v-2h-1z" />
    <path d="M36 32h-1v2h2v-2z" />
  </g>
  <g class="gotchi-shadow">
    <path opacity=".25" d="M25 58H19v1h1v1h24V59h1V58h-1z" fill="#000" />
  </g>
  <g class="gotchi-eyeColor">
    <path d="M23 28V29V30H24H25H26H27V29V28H28H29V27V26V25V24H28H27V23V22H26H25H24H23V23V24H22H21V25V26V27V28H22H23Z" />
    <path d="M35 24V25V26V27V28H36H37V29V30H38H39H40H41V29V28H42H43V27V26V25V24H42H41V23V22H40H39H38H37V23V24H36H35Z" />
  </g>
  <g class="gotchi-collateral">
    <g fill="#64438e">
      <path d="M29 17v-2h-1v4h1v-1z" />
      <path d="M29 14h1v1h-1zm0 5h1v1h-1z" />
      <path d="M30 20h1v1h-1z" />
      <path d="M31 21v1h2v-1h-1zm-1-8h1v1h-1zm4 6h1v1h-1zm0-5h1v1h-1z" />
      <path d="M33 13v-1h-2v1h1zm0 7h1v1h-1z" />
      <path d="M33 13h1v1h-1zm2 2v4h1v-4z" />
    </g>
    <path d="M34 17h-2v4h1v-1h1v-1h1v-2z" fill="#c260ff" />
    <g fill="#dea8ff">
      <path d="M30 17h-1v2h1v1h1v1h1v-4h-1z" />
      <path d="M34 15v-1h-1v-1h-1v4h3v-2z" />
    </g>
    <path d="M31 17h1v-4h-1v1h-1v1h-1v2h1z" fill="#edd3fd" />
  </g>
  <g class="gotchi-handsDownClosed">
    <g class="gotchi-primary">
      <path d="M19 42h1v1h-1zm1-6h1v1h-1z" />
      <path d="M21 37h1v1h-1zm5 3v4h1v-4zm-5 3h-1v1h2v-1z" />
      <path d="M24 44h-2v1h4v-1h-1zm1-5h-1v1h2v-1z" />
      <path d="M23 38h-1v1h2v-1z" />
    </g>
    <g class="gotchi-secondary">
      <path d="M19 43h1v1h-1zm5 2h-2v1h4v-1h-1z" />
      <path d="M27 41v3h1v-3zm-6 3h-1v1h2v-1z" />
      <path d="M26 44h1v1h-1zm-7-3h-1v2h1v-1z" />
    </g>
    <g class="gotchi-primary">
      <path d="M44 42h1v1h-1zm-1-6h1v1h-1z" />
      <path d="M42 37h1v1h-1z" />
      <path d="M42 39v-1h-2v1h1zm0 4v1h2v-1h-1z" />
      <path d="M40 44h-2v1h4v-1h-1z" />
      <path d="M38 42v-2h-1v4h1v-1z" />
      <path d="M40 40v-1h-2v1h1z" />
    </g>
    <g class="gotchi-secondary">
      <path d="M42 44v1h2v-1h-1zm-5-2v-1h-1v3h1v-1z" />
      <path d="M40 45h-2v1h4v-1h-1z" />
      <path d="M37 44h1v1h-1zm7-1h1v1h-1z" />
    </g>
  </g>
  <g class="gotchi-handsDownOpen">
    <g class="gotchi-primary">
      <path d="M14 40h1v1h-1v-1zm-1-6h1v1h-1v-1z" />
      <path d="M14 33h1v1h-1v-1zm-2 2h1v1h-1v-1zm-5 3h1v4H7v-4zm5 3h2v1h-2v-1z" />
      <path d="M8 42h4v1H8v-1zm0-5h2v1H8v-1z" />
      <path d="M10,36h2v1h-2V36z" />
    </g>
    <g class="gotchi-secondary">
      <path d="M14,39h1v1h-1V39z" />
      <path d="M12,40h2v1h-2V40z" />
      <path d="M8,41h4v1H8V41z" />
    </g>
    <path d="M8,38v3h4v-1h2v-1h1v-5h-1v1h-1v1h-1v1h-2v1H8z" fill="#fff" />
    <g class="gotchi-primary">
      <path d="M49 40h1v1h-1v-1zm1-6h1v1h-1v-1z" />
      <path d="M49 33h1v1h-1v-1zm2 2h1v1h-1v-1zm5 3h1v4h-1v-4zm-6 3h2v1h-2v-1z" />
      <path d="M52 42h4v1h-4v-1zm2-5h2v1h-2v-1z" />
      <path d="M52,36h2v1h-2V36z" />
    </g>
    <g class="gotchi-secondary">
      <path d="M49,39h1v1h-1V39z" />
      <path d="M50,40h2v1h-2V40z" />
      <path d="M52,41h4v1h-4V41z" />
    </g>
    <path d="M54,38v-1h-2v-1h-1v-1h-1v-1h-1v5h1v1h2v1h4v-3H54z" fill="#fff" />
  </g>
  <g class="gotchi-handsUp">
    <g class="gotchi-secondary">
      <path d="M50,38h1v1h-1V38z" />
      <path d="M49 39h1v1h-1v-1zm2-2h1v1h-1v-1z" />
      <path d="M52,36h2v1h-2V36z" />
      <path d="M54,35h2v1h-2V35z" />
    </g>
    <path d="M52,32v1h-2v1h-1v5h1v-1h1v-1h1v-1h2v-1h2v-3H52z" fill="#fff" />
    <g class="gotchi-primary">
      <path d="M49,33h1v1h-1V33z" />
      <path d="M50 32h2v1h-2v-1zm0 7h1v1h-1v-1z" />
      <path d="M49 40h1v1h-1v-1zm2-2h1v1h-1v-1z" />
      <path d="M52 37h2v1h-2v-1zm0-6h4v1h-4v-1z" />
      <path d="M56,32h1v4h-1V32z" />
      <path d="M54,36h2v1h-2V36z" />
    </g>
    <g class="gotchi-secondary">
      <path d="M13,38h1v1h-1V38z" />
      <path d="M14 39h1v1h-1v-1zm-2-2h1v1h-1v-1z" />
      <path d="M10,36h2v1h-2V36z" />
      <path d="M8,35h2v1H8V35z" />
    </g>
    <path d="M8,32v3h2v1h2v1h1v1h1v1h1v-5h-1v-1h-2v-1H8z" fill="#fff" />
    <g class="gotchi-primary">
      <path d="M14,33h1v1h-1V33z" />
      <path d="M12 32h2v1h-2v-1zm1 7h1v1h-1v-1z" />
      <path d="M14 40h1v1h-1v-1zm-2-2h1v1h-1v-1z" />
      <path d="M10 37h2v1h-2v-1zm-2-6h4v1H8v-1z" />
      <path d="M7,32h1v4H7V32z" />
      <path d="M8,36h2v1H8V36z" />
    </g>
  </g>
</svg>`

