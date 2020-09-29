<template>
  <div style="height: 100%; width: 100%; border: 1px solid #00F;">
    <div style="position: fixed; left: 20pt; top: 20pt; z-index: 99999;">
      <Button size="small" @click="addEles">添加</Button>
      <Button size="small" @click="delEles">删除</Button>
    </div>
    <CJS ref="ref_CJS"></CJS>
  </div>
</template>

<script>
  import CJS from './components/cjs';

  export default {
    name: "Test",
    components: {CJS,},
    watch: {},
    mounted() {
      this.addEles();
    },
    methods: {
      addEles() {
        this.$refs['ref_CJS'].addEles([
          {group: 'nodes', data: {'id': '鲁A123456', 'name': '鲁A123456',}, classes: 'classes-A', position: {x: 200, y: 50}},
          {group: 'nodes', data: {'id': '鲁B123456', 'name': '鲁B123456',}, classes: 'classes-A', position: {x: 500, y: 50}},
          {group: 'nodes', data: {'id': '鲁C123456', 'name': '鲁C123456',}, classes: 'classes-A', display: 'hide', position: {x: 200, y: 150}},
          {group: 'nodes', data: {'id': '鲁D123456', 'name': '鲁D123456',}, classes: 'classes-A', position: {x: 500, y: 150}},
          {group: 'nodes', data: {'id': '小王', 'name': '小王',}, classes: 'classes-B', position: {x: 100, y: 100}},
          {group: 'nodes', data: {'id': '小赵', 'name': '小赵',}, classes: 'classes-B', position: {x: 400, y: 100}},
          {group: 'nodes', data: {'id': '川川某公司', 'name': '川川某公司',}, classes: 'classes-C', display: 'hide', position: {x: 300, y: 100}},
          {group: 'nodes', data: {'id': '京京某单位', 'name': '京京某单位',}, classes: 'classes-D', position: {x: 300, y: 200}},
          {group: 'edges', data: {id: 'e0', name: '拥有', source: '小王', target: '鲁A123456'}},
          {group: 'edges', data: {id: 'e1', name: '拥有', source: '小赵', target: '鲁B123456'}},
          {group: 'edges', data: {id: 'e2', name: '拥有', source: '小王', target: '鲁C123456'}},
          {group: 'edges', data: {id: 'e3', name: '拥有', source: '小赵', target: '鲁D123456'}},
          {group: 'edges', data: {id: 'e4', name: '就职', source: '小王', target: '川川某公司'}},
          {group: 'edges', data: {id: 'e5', name: '就职', source: '小赵', target: '川川某公司'}},
          {group: 'edges', data: {id: 'e6', name: '租用', source: '川川某公司', target: '鲁A123456'}},
          {group: 'edges', data: {id: 'e7', name: '租用', source: '川川某公司', target: '鲁B123456'}}
        ]);
      },
      delEles() {
        this.$refs['ref_CJS'].delEles();
      },
    },
  }
</script>

<style scoped>
</style>
