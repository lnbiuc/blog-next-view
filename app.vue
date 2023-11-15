<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <div class="main-bg z-0 h-full w-full opacity-20" />
  <div class="relative z-10">
    <Header />
    <NuxtLayout name="default">
      <template #main>
        <NuxtPage />
      </template>
    </NuxtLayout>
    <Footer />
  </div>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #0E1111;
  color: white;
}

.main-bg {
  position: fixed;
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1043%26quot%3b)' fill='none'%3e%3cpath d='M936.251%2c367.933C984.895%2c366.211%2c1026.494%2c336.831%2c1051.292%2c294.948C1076.631%2c252.152%2c1085.405%2c199.824%2c1061.661%2c156.123C1036.919%2c110.585%2c988.008%2c85.883%2c936.251%2c83.214C878.776%2c80.25%2c815.491%2c92.357%2c786.242%2c141.921C756.659%2c192.052%2c773.992%2c255.125%2c806.182%2c303.624C834.849%2c346.815%2c884.444%2c369.767%2c936.251%2c367.933' fill='rgba(167%2c 139%2c 250%2c 0.2)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M236.14%2c195.51C271.265%2c194.193%2c301.167%2c171.847%2c318.059%2c141.022C334.268%2c111.444%2c334.403%2c75.938%2c317.733%2c46.618C300.865%2c16.949%2c270.26%2c-2.282%2c236.14%2c-3.063C200.603%2c-3.877%2c166.522%2c12.507%2c147.807%2c42.727C128.059%2c74.614%2c124.064%2c115.123%2c142.837%2c147.594C161.593%2c180.034%2c198.694%2c196.914%2c236.14%2c195.51' fill='rgba(167%2c 139%2c 250%2c 0.2)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M665.393%2c288.587C694.823%2c288.212%2c711.757%2c258.646%2c726.19%2c232.996C740.227%2c208.05%2c753.731%2c179.881%2c740.981%2c154.254C727.106%2c126.365%2c696.534%2c110.03%2c665.393%2c110.798C635.452%2c111.536%2c609.676%2c131.186%2c595.998%2c157.83C583.439%2c182.295%2c588.957%2c210.291%2c601.849%2c234.582C615.816%2c260.899%2c635.602%2c288.967%2c665.393%2c288.587' fill='rgba(167%2c 139%2c 250%2c 0.2)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M431.204%2c435.672C449.471%2c435.59%2c466.944%2c426.671%2c475.829%2c410.711C484.497%2c395.14%2c481.541%2c376.462%2c472.818%2c360.922C463.876%2c344.993%2c449.451%2c332.065%2c431.204%2c331.215C411.519%2c330.298%2c392.013%2c339.567%2c382.29%2c356.707C372.678%2c373.652%2c375.621%2c394.554%2c385.88%2c411.115C395.578%2c426.772%2c412.787%2c435.755%2c431.204%2c435.672' fill='rgba(167%2c 139%2c 250%2c 0.2)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1221.726%2c534.643C1254.155%2c536.117%2c1287.567%2c525.651%2c1304.986%2c498.258C1323.596%2c468.992%2c1325.78%2c430.081%2c1306.586%2c401.194C1288.903%2c374.581%2c1253.678%2c373.032%2c1221.726%2c372.954C1189.576%2c372.876%2c1152.71%2c373.224%2c1136.146%2c400.779C1119.283%2c428.831%2c1132.99%2c463.665%2c1150.62%2c491.241C1166.651%2c516.317%2c1191.995%2c533.291%2c1221.726%2c534.643' fill='rgba(167%2c 139%2c 250%2c 0.2)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1048.391%2c290.122C1107.379%2c289.902%2c1154.555%2c244.748%2c1181.311%2c192.177C1205.552%2c144.546%2c1202.848%2c87.922%2c1174.29%2c42.747C1147.597%2c0.522%2c1098.266%2c-15.27%2c1048.391%2c-18.087C991.427%2c-21.305%2c925.85%2c-21.132%2c895.184%2c26.981C863.073%2c77.363%2c883.678%2c141.545%2c913.739%2c193.176C943.565%2c244.404%2c989.113%2c290.343%2c1048.391%2c290.122' fill='rgba(167%2c 139%2c 250%2c 0.2)' class='triangle-float3'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1043'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");  background-repeat: no-repeat;
  background-position: right bottom;
}
</style>
