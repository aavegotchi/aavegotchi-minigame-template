const eyes = {
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

const mouths = {
  neutral: `<g class="gotchi-primary-mouth">
    <path d="M33 34h-4v2h6v-2h-1z" />
   </g>`,
};

/**
 * Converts SVG to Blob URL
 * @param {string} svg - SVG you want to turn into Blob URL
 * @returns {string} Object URL of Blob
 */
export const convertInlineSVGToBlobURL = (svg: string) => {
  const blob = new Blob([svg], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
};

/**
 * Removes background from Aavegotchi SVG
 * @param {string} svg - SVG you want to customise
 * @returns {string} Returns customised SVG
 */
export const removeBG = (svg: string) => {
  const styledSvg = svg.replace("<style>", "<style>.gotchi-bg{display: none}");
  return styledSvg;
};

/**
 * Adds Keyframe animation to SVG. (NOT TO BE USED IN IN GAME SPRITESHEET)
 * @param {string} svg - SVG you want to customise
 * @returns {string} Returns customised SVG
 */
export const bounceAnimation = (svg: string) => {
  const style = `
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
    }
    svg {
      animation-name:down;
      animation-duration:1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-timing-function: steps(1);
    }
    .gotchi-shadow {
      animation: up 1s infinite linear steps(2);
      animation-name:up;
      animation-duration:1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-timing-function: steps(2);
    }
    .gotchi-wearable {
      animation-name:down;
      animation-duration:1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-timing-function: steps(1);
    }
    .gotchi-handsDownClosed, .gotchi-handsUp, .gotchi-handsDownOpen, .gotchi-handsDownClosed, .gotchi-body, .gotchi-eyeColor, .gotchi-collateral, .gotchi-cheek, .gotchi-primary-mouth, .gotchi-wearable, .gotchi-sleeves   {
      animation-name:down;
      animation-duration:1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-timing-function: steps(2);
    }
    .wearable-hand {
      animation-name:down !important;
      animation-duration:1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-timing-function: steps(2);
    }
  `;
  const styledSvg = svg.replace("<style>", `<style>${style}`);
  return styledSvg;
};


/**
 * Adds SVG styling to Aavegotchi to raise its arms
 * @param {string} svg - SVG you want to customise
 * @returns {string} Returns customised SVG
 */
export const raiseHands = (svg: string) => {
  const style = `
    .gotchi-handsDownClosed {
      display:none !important;
    }
    .gotchi-handsDownOpen {
      display:none !important;
    }
    .gotchi-handsUp {
      display:block !important;
    }
    .gotchi-sleeves {
      display:none !important;
    }
    .gotchi-sleeves-up {
      display:block !important;
    }
    .wearable-hand {
      transform: translateY(-7px);
    }
  `;

  const styledSvg = svg.replace("<style>", `<style>${style}`);
  return styledSvg;
};

/**
 * Adds SVG styling to Aavegotchi so it appears to float higher
 * @param {string} svg - SVG you want to customise
 * @returns {string} Returns customised SVG
 */
export const addIdleUp = (svg: string): string => {
  const styledSvg = svg.replace(
    "<style>",
    "<style>.gotchi-shadow {transform: translateY(1px);}.gotchi-wearable,.gotchi-handsDownClosed,.gotchi-handsUp,.gotchi-handsDownOpen,.gotchi-handsDownClosed,.gotchi-body,.gotchi-eyeColor,.gotchi-collateral,.gotchi-cheek,.gotchi-primary-mouth,.gotchi-wearable,.gotchi-sleeves {transform: translateY(-1px);}"
  );
  return styledSvg;
};

interface ReplaceEyes {
  target: "eyes";
  replaceSvg: keyof typeof eyes;
}

interface ReplaceMouth {
  target: "mouth";
  replaceSvg: keyof typeof mouths;
}

type ReplaceElement = ReplaceEyes | ReplaceMouth;

/**
 * Replaces a layer in the Aavegotchi SVG with custom SVG data
 * @param {string} svg - SVG you want to customise
 * @param {ReplaceElement} element - target of element you want to replace + element you want to replace it with
 * @returns {string} Returns customised SVG
 */
export function replaceParts(svg: string, element: ReplaceElement) {
  const doc = document.createDocumentFragment();
  const wrapper = document.createElement("svg");
  wrapper.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  wrapper.setAttribute("viewbox", "0 0 64 64");
  wrapper.innerHTML = svg;
  doc.appendChild(wrapper);

  const targetClass =
    element.target === "eyes" ? "g.gotchi-eyeColor" : "g.gotchi-primary-mouth";
  const textnodes = doc.querySelectorAll(targetClass);

  textnodes.forEach(function (txt) {
    const el = document.createElement("g");
    el.innerHTML =
      element.target === "eyes"
        ? eyes[element.replaceSvg]
        : mouths[element.replaceSvg];
    txt.parentNode?.replaceChild(el, txt);
  });
  const div = document.createElement("svg");
  div.appendChild(doc);
  return div.innerHTML;
}


type CustomiseOptions = {
  removeBg?: boolean,
  eyes?: keyof typeof eyes,
  mouth?: keyof typeof mouths,
  float?: boolean,
  armsUp?: boolean,
}

/**
 * Customise Aavegotchi SVG
 * @param {string} svg - SVG you want to customise
 * @param {CustomiseOptions} options - Properties you want to change
 * @returns {string} Returns customised SVG
 */
export const customiseSVG = (svg: string, options: CustomiseOptions) => {
  let styledSvg = svg;
  (Object.keys(options) as Array<keyof typeof options>).map((option) => {
    const value = options[option];
    if (value) {
      switch (option) {
        case 'removeBg':
          return styledSvg = removeBG(styledSvg);
        case 'eyes':
          return styledSvg = replaceParts(styledSvg, {target: option, replaceSvg: value as keyof typeof eyes});
        case 'mouth':
          return styledSvg = replaceParts(styledSvg, {target: option, replaceSvg: value as keyof typeof mouths});
        case 'float':
          return styledSvg = addIdleUp(styledSvg);
        case 'armsUp':
          return styledSvg = raiseHands(styledSvg);
        default:
          return styledSvg;
      }
    }
  })
  return styledSvg;
}
