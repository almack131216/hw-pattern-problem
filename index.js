// DEBUG
// show console (for debug)
const clg = true
clg && console.log("|||| TAPJOY ||||")

// STRINGS
// put strings into arrays
// example input
const exampleArr = [
  "rttr[mnop]qrst",
  "rttr[mnop]qrst[xdftethh]xyyx",
  "efgh[baab]ommo",
  "bbbb[qwer]ereq",
  "irttrj[asdfgh]zxcvbn",
]
// Sample Input
const sampleArr = [
  "xdsqxnovprgovwzkus[fmadbfsbqwzzrzrgdg]aeqornszgvbizdm",
  "itgslvpxoqqakli[arktzcssgkxktejbno]wsgkbwwtbmfnddt[zblrboqsvezcgfmfvcz]iwyhyatqetsreeyhh",
  "pyxuijrepsmyiacl[rskpebsqdfctoqg]hbwageeiufvcmuk[wfvdhxyzmfgmcphpfnc]aotmbcnntmdltjxuusn",
  "mfhczaevladdsqawgp[rwabwdnwiytloldf]varesbnjnsdbsmhmsi[tyjtbpzrbfzbwlga]sznkksuymkbyxlykfqg[fyislgfghcbltaft]knrkzaldhauordwfl",
  "piftqfdhtumcmjmsge[qrsntvxhtfurcgcynx]oyswvuklvtmivlhen[syqhqtijyiduoxb]pdtdrhijqqzvcnl[xivmeqcwyafxvnok]jvlbkrwbgcgzaqms",
  "pfqiqyscrxhvtrjzt[unmovhoommbcckocp]ziwuhtfghcqhzeysdw[zmhlfonldrgkbimft]nnlbctvfpbcoqzw[zivyewjzuuvvasybded]mznpvozhzsvkdedqu",
  "adncdhtushtvtfcbez[rvaycmplefdvbrchc]vtviiplkpfhsyhwzz[pdpnsseaizogzvtkcq]piorguaivfpummlo",
  "cdgyiakhcpbibtdwm[dqmibwtfswjlfxvwe]jghsohdnnowueerunt[stsuvrwswspkgom]mmyifoverwkyjqfofhd",
  "luqpeubugunvgzdqk[jfnihalscclrffkxqz]wvzpvmpfiehevybbgpg[esjuempbtmfmwwmqa]rhflhjrqjbbsadjnyc",
  "yqdhleetfcqhdiib[eceprgdrrsmbarxdtbq]hdayiijoaaeumfwcdj",
  "cqqvoxzdokmgiwgcks[jqzwdkyjpbdchlt]phkfcoalnhoxnczrru",
  "uxpvoytxfazjjhi[qogwhtzmwxvjwxreuz]zduoybbzxigwggwu[lamifchqqwbphhsqnf]qrjdjwtnhsjqftnqsk[bsqinwypsnnvougrs]wfmhtjkysqffllakru",
  "jfuokpqkhmnvixa[fxfcqxfxbmhazuspg]eqfpfndvqnxluairk",
  "rvvyvofaygynnetjtry[kegzdkleyezldyeyn]erioueyndgksxetku[tsarhnyrbaubgmteiw]lbcsksdiqqdacutvc",
]
// switch between example or sample strings
const useSampleArr = true

// VARIABLES
const strArrBefore = useSampleArr ? sampleArr : exampleArr
let strArrAfter = [] // push strings with pattern matches into new array
let str // string (to be stripped of brackets and text inside brackets)
let strInBracketArr // string inside square brackets of string(s)
let pattern // pattern(s) found in string(s)
let patternArr // ALL pattern(s) found in string(s)
let listBefore = "" // print list items from source (strArrBefore)
let listAfter = "" // print list items with patterns

loop1: for (let i = 0, len = strArrBefore.length; i < len; i++) {
  // 1 - loop through string list...
  // 1.1 - get string and find strings within brackets
  str = strArrBefore[i]
  pattern = ""
  patternArr = []
  strInBracketArr = str.match(/(?<=\[)[^\][]*(?=])/g)
  listBefore += `<li>${str}</li>`
  clg && console.log("----------------\r\n----------------")
  clg && console.log("str: ", str)
  clg && console.log("strInBracketArr: ", strInBracketArr)
  // (END) 1

  // 2 loop through remaining string...
  loop2: for (let i2 = 0, len2 = str.length; i2 < len2; i2++) {
    // 2.1 - if we find matching characters 3 characters apart (4 characters)...
    if (
      str[i2] === str[i2 + 3] &&
      str[i2] !== str[i2 + 1] &&
      str[i2 + 1] === str[i2 + 2]
    ) {
      // 2.2 - get this 4 character group...
      pattern = str.substring(i2, i2 + 4)
      clg && console.log("pattern: ", pattern)
      // 2.3 - if this pattern is between []
      if (strInBracketArr.findIndex((v) => v.includes(pattern)) !== -1) {
        clg && console.log(`[! INVALID] - "${pattern}" is inside []`)
        patternArr = []
        continue loop1
      }
      // 2.4 - VALID (but keep checking remaining string...)
      patternArr.push(pattern)
      clg && console.log(`patternArr.push("${pattern}")`)
      i2 = i2 + 3 // skip 3 characters (not necessary to loop them)
    }
  }
  // (END) 2

  // PRINT listAfter li tag (strings with patterns)
  clg && console.log("patternArr: ", patternArr)
  if (patternArr.length) {
    clg && console.log("[VALID] - PRINT STRING with pattern highlighted")
    strArrAfter.push(str)
    listAfter += "<li>"
    for (let p = 0, pLen = patternArr.length; p < pLen; p++) {
      str = str.replace(
        patternArr[p],
        `<span style="background-color:green;color:white;">${patternArr[p]}</span>`
      )
    }
    listAfter += str
    listAfter += "</li>"
  }
}

// PRINT lists (before and after)
const body = document.getElementsByTagName("body")[0]
// Output - before
if (!strArrBefore.length) {
  const hdrEmpty = document.createElement("h1")
  const hdrEmptyTextNode = document.createTextNode(`Error loading list items`)
  hdrEmpty.appendChild(hdrEmptyTextNode)
  body.appendChild(hdrEmpty)
}
if (strArrBefore.length) {
  const hdrBefore = document.createElement("h1")
  const hdrBeforeTextNode = document.createTextNode(
    `Before (${strArrBefore.length})`
  )
  const ulBefore = document.createElement("ul")
  ulBefore.innerHTML = listBefore
  hdrBefore.appendChild(hdrBeforeTextNode)
  body.appendChild(hdrBefore)
  body.appendChild(ulBefore)
}
// Output - after
if (strArrAfter.length) {
  const hdrAfter = document.createElement("h1")
  const hdrAfterTextNode = document.createTextNode(
    `After (${strArrAfter.length})`
  )
  const ulAfter = document.createElement("ul")
  hdrAfter.appendChild(hdrAfterTextNode)
  ulAfter.innerHTML = listAfter
  //
  body.appendChild(hdrAfter)
  body.appendChild(ulAfter)
}
