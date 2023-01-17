import { ElMessageBox } from "element-plus";
/**
 * 换肤加class函数
 */
export function toggleClass(element: Element, className: string) {
  if (!element || !className) {
    return;
  }
  element.className = className;
}

interface ColorObject {
  [ke: string]: any;
}
export function showAlert(
  message: string,
  type: string,
  showClose: boolean,
  dangerouslyUseHTMLString: string,
  callback: any
) {
  /**
   * js 
   * 
   *   const colors  = {
    success: "#67C23A",
    warning: "#E6A23C",
    danger: "#F56C6C",
    error: "#F56C6C",
    info: "#909399",
  };

  直接调用：${colors[type]}
   */

  const colors: ColorObject = {
    success: "#67C23A",
    warning: "#E6A23C",
    danger: "#F56C6C",
    error: "#F56C6C",
    info: "#909399",
  };
  if (!dangerouslyUseHTMLString || dangerouslyUseHTMLString) {
    message = `<span style="color:${colors[type]}">${message}</span>`;
  }
  const title = !type || type === "success" ? "成功" : "提示";

  const typeOp: any = type || "success";

  ElMessageBox.alert(message, title, {
    type: typeOp,
    dangerouslyUseHTMLString: true,
    confirmButtonText: "确定",
    showClose: showClose,
    callback: callback,
  });
}

export function wxmAlert(message: any, type?: any, callback?: any) {
  const colors: ColorObject = {
    success: "#67C23A",
    warning: "#E6A23C",
    danger: "#F56C6C",
    error: "#F56C6C",
    info: "#909399",
  };
  message = `<span style="color:${colors[type]}">${message}</span>`;
  const title = !type || type === "success" ? "成功" : "提示";
  ElMessageBox.alert(message, title, {
    type: type || "success",
    confirmButtonText: "确定",
    showClose: false,
    dangerouslyUseHTMLString: true,
    callback: callback,
  });
}

export function getSysType() {
  const sUserAgent = navigator.userAgent;
  const isWin =
    navigator.platform === "Win32" || navigator.platform === "Windows";
  const isMac =
    navigator.platform === "Mac68K" ||
    navigator.platform === "MacPPC" ||
    navigator.platform === "Macintosh" ||
    navigator.platform === "MacIntel";
  if (isMac) return "Mac";
  const isUnix = navigator.platform === "X11" && !isWin && !isMac;
  if (isUnix) return "Unix";
  const isLinux = String(navigator.platform).indexOf("Linux") > -1;
  if (isLinux) return "Linux";
  if (isWin) {
    const isWin2K =
      sUserAgent.indexOf("Windows NT 5.0") > -1 ||
      sUserAgent.indexOf("Windows 2000") > -1;
    if (isWin2K) return "Win2000";
    const isWinXP =
      sUserAgent.indexOf("Windows NT 5.1") > -1 ||
      sUserAgent.indexOf("Windows XP") > -1;
    if (isWinXP) return "WinXP";
    const isWin2003 =
      sUserAgent.indexOf("Windows NT 5.2") > -1 ||
      sUserAgent.indexOf("Windows 2003") > -1;
    if (isWin2003) return "Win2003";
    const isWinVista =
      sUserAgent.indexOf("Windows NT 6.0") > -1 ||
      sUserAgent.indexOf("Windows Vista") > -1;
    if (isWinVista) return "WinVista";
    const isWin7 =
      sUserAgent.indexOf("Windows NT 6.1") > -1 ||
      sUserAgent.indexOf("Windows 7") > -1;
    if (isWin7) return "Win7";
    const isWin10 =
      sUserAgent.indexOf("Windows NT 10.0") > -1 ||
      sUserAgent.indexOf("Windows 10") > -1;
    if (isWin10) return "Win10";
    return "Win8";
  }
  return "other";
}

export function isNormal(str: string) {
  // console.log(str.match(/[\u0000-\u00ff]/g))   //半角
  // console.log(str.match(/[\u4e00-\u9fa5]/g))   //中文
  // console.log(str.match(/[\uff00-\uffff]/g))   //全角
  const rule: RegExp = /[\uff00-\uffff]/g;
  return str.match(rule)?.length === 0;
}

export function toNormal(str: string) {
  let tmp = "";
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) === 12288) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 12256);
      continue;
    }
    if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return tmp;
}
