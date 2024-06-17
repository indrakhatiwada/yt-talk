import Extension from "components/extensions"
import cssText from "data-text:~style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetShadowHostId,
  PlasmoGetStyle
} from "plasmo"

const ANCHOR_ID = "#secondary.style-scope.ytd-watch-flexy"

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(ANCHOR_ID),
  insertPosition: "afterbegin"
})

export const getShadowHostId: PlasmoGetShadowHostId = () => `plasmo-inline`

//set styles to extensions

export const getStyle: PlasmoGetStyle = () => {
  const baseFontSize = 12
  let updatedCss = cssText.replaceAll(":root", ":host(plasmo-csui)")
  /* 
In summary, this regular expression is specifically designed to find and capture numeric values
 followed by "rem" in a string. It can be used, for example, to extract the numeric values 
from CSS properties that use the "rem" unit, such as font-size: 1.2rem;.
*/
  const remRegex = /([\d.]+)rem/g

  updatedCss = updatedCss.replace(remRegex, (match, remValue) => {
    const pixels = parseFloat(remValue) * baseFontSize
    return `${pixels}px`
  })

  const style = document.createElement("style")
  style.textContent = updatedCss
  return style
}

function PlasmoMainUi() {
  return <Extension />
}

export default PlasmoMainUi
