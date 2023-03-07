<template>
    <div>
			<h1>{{ userName }}</h1>
			<p>{{ message }}</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      userName: 'Test',
      message: 'Welcome Hun\'s project',
      arr: [],
      obj: {}
    }
  }
}
</script>

// 해당 컴포넌트 안에서만 적용되는 스타일! -> scoped  // 전체 적용이 필요한 경우 scoped 제외
// 보통 assets 폴더 내에 css 폴더를 구성해 별도로 작업!
<style scoped>
.text-red {
color : red;
}
</style>
