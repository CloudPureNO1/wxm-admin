<template>
  <div class="s-canvas">
    <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>
<script setup lang ="ts" name="WxmVerifyCode">
import { onMounted, watch, reactive } from "vue"


type Props = {
  identifyCode?: string,
  fontSizeMin?: number,
  fontSizeMax?: number,
  backgroundColorMin?: number,
  backgroundColorMax?: number,
  colorMin?: number,
  colorMax?: number,
  lineColorMin?: number,
  lineColorMax?: number,
  dotColorMin?: number,
  dotColorMax?: number,
  contentWidth?: number,
  contentHeight?: number
}
const props = withDefaults(defineProps<Props>(), {
  identifyCode: 'WXM',
  fontSizeMin: 35,
  fontSizeMax: 45,
  backgroundColorMin: 255,
  backgroundColorMax: 255,
  colorMin: 0,
  colorMax: 200,
  lineColorMin: 100,
  lineColorMax: 255,
  contentWidth: 112,
  contentHeight: 31
})
/* const {
  identifyCode = 'WXM',
  fontSizeMin = 35,
  fontSizeMax = 45,
  backgroundColorMin = 255,
  backgroundColorMax = 255,
  colorMin = 0,
  colorMax = 200,
  lineColorMin = 100,
  lineColorMax = 255,
  contentWidth = 112,
  contentHeight = 31
} = defineProps<Props>()
 */
// 生成一个随机数
function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}
// 生成一个随机的颜色
function randomColor(min: number, max: number) {
  let r = randomNum(min, max)
  let g = randomNum(min, max)
  let b = randomNum(min, max)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
function drawPic() {
  let canvas: any = document.getElementById('s-canvas')
  let ctx = canvas.getContext('2d')
  ctx.textBaseline = 'bottom'
  // 绘制背景
  ctx.fillStyle = randomColor(props.backgroundColorMin, props.backgroundColorMax)
  ctx.fillRect(0, 0, props.contentWidth, props.contentHeight)
  // 绘制文字
  for (let i = 0; i < props.identifyCode.length; i++) {
    drawText(ctx, props.identifyCode[i], i)
  }
  drawLine(ctx)
  drawDot(ctx)
}
function drawText(ctx: any, txt: any, i: number) {
  ctx.fillStyle = randomColor(props.colorMin, props.colorMax)
  ctx.font =
    randomNum(props.fontSizeMin, props.fontSizeMax) + 'px SimHei'
  let x = (i + 1) * (props.contentWidth / (props.identifyCode.length + 1))
  let y = randomNum(props.fontSizeMax, props.contentHeight - 5)
  var deg = randomNum(-45, 45)
  // 修改坐标原点和旋转角度
  ctx.translate(x, y)
  ctx.rotate((deg * Math.PI) / 280)
  ctx.fillText(txt, 0, 0)
  // 恢复坐标原点和旋转角度
  ctx.rotate((-deg * Math.PI) / 280)
  ctx.translate(-x, -y)
}
function drawLine(ctx: any) {
  // 绘制干扰线
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = randomColor(
      props.lineColorMin,
      props.lineColorMax
    )
    ctx.beginPath()
    ctx.moveTo(
      randomNum(0, props.contentWidth),
      randomNum(0, props.contentHeight)
    )
    ctx.lineTo(
      randomNum(0, props.contentWidth),
      randomNum(0, props.contentHeight)
    )
    ctx.stroke()
  }
}

function drawDot(ctx: any) {
  // 绘制干扰点
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = randomColor(0, 255)
    ctx.beginPath()
    ctx.arc(
      randomNum(0, props.contentWidth),
      randomNum(0, props.contentHeight),
      1,
      0,
      2 * Math.PI
    )
    ctx.fill()
  }
}

onMounted(() => {
  drawPic()
})
let code = reactive(props)
watch(code, () => {
  drawPic()
})


</script>
<style scoped>
.s-canvas {
  height: 38px;
}

.s-canvas canvas {
  margin-top: 1px;
  margin-left: 8px;
}
</style>
