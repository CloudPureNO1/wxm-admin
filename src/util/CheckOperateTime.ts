import router from "../router";
 

const timeout: number = 30 * 60 * 1000; // 超时时间30分钟
const checkTime: number = 3 * 60 * 1000; // 3分钟查询一次

function fn(e: any, v: String) {
  const evt = e || window.event; // 兼容ie低版本的
  // console.log(v, '****,>>>>>>>>>>>>>>>>计时,', e)
  if (v === "wheel") {
    if (evt.deltaY > 0) {
      console.log(">>>>>>>>>>>>向下滚动");
    } else {
      console.log("***************向上滚动");
    }
  }
  if (v === "mousedown") {
    if (evt.button === 0) {
      // 鼠标左键
      console.log(">>>>>>>您点击了鼠标左键");
    } else if (evt.button === 2) {
      // 鼠标右键
      console.log(">>>>>>>您点击了鼠标右键");
    } else if (evt.button === 1) {
      // 鼠标中键
      console.log(">>>>>>>您点击了鼠标中键");
    } else if (evt.button === 3) {
      // 鼠标侧键3
      console.log(">>>>>>>您点击了鼠标侧键(后退)");
    } else if (evt.button === 4) {
      // 鼠标侧键4
      console.log(">>>>>>>您点击了鼠标侧键(前进)");
    }
  }

  localStorage.setItem("lastTime", String(new Date().getTime()));

}

function loginOut() {
  // localStorage.clear()
  Object.keys(localStorage).forEach((key) => {
    if (key !== "logLevel:webpack-dev-server") {
      localStorage.removeItem(key);
    }
  });
  Object.keys(sessionStorage).forEach((key) => sessionStorage.removeItem(key));
  router.push("/login");
}

function checkTimeOut() {
  const lastTime = Number(localStorage.getItem("lastTime"));
  const currentTime = new Date().getTime();
  if (currentTime - lastTime > timeout) {
    console.log("长时间未操作，退出系统");
    loginOut();
  }
}

window.onload = () => {
  window.addEventListener("move", (e) => fn(e, "move"), false); // 浏览器窗口被移动时触发
  window.addEventListener("resize", (e) => fn(e, "resize"), false); // 浏览器窗口大小被改变时触发
  window.addEventListener("keyup", (e) => fn(e, "keyup"), false); // 按键释放时触发
  window.addEventListener("wheel", (e) => fn(e, "wheel"), false); // 鼠标滚动时触发
  window.addEventListener("mouseover", (e) => fn(e, "mouseover"), false); //  鼠标移入另一个元素时触发（包含子元素）
  window.addEventListener("mouseout", (e) => fn(e, "mouseout"), false); // 鼠标移入元素时触发（包含子元素）
  window.addEventListener("mousedown", (e) => fn(e, "mousedown"), false); // 鼠标按下时触发
};

export default function () {
  window.setInterval(checkTimeOut, checkTime); // 10分钟检查一次
}
