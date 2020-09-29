<style scoped>
</style>

<template>
  <div style="position: relative; height: 100%; width: 100%; z-index: 0;">
    <div id="cytoscape_id" style="height: 100%; width: 100%; z-index: 1;"></div>
  </div>
</template>

<script>
  import cytoscape from 'cytoscape';
  import cxtmenu from 'cytoscape-cxtmenu';
  import cola from 'cytoscape-cola';
  import avsdf from 'cytoscape-avsdf';
  import coseBilkent from 'cytoscape-cose-bilkent';


  export default {
    name: "CJS",
    beforeCreate() {
      this.$cy && this.$cy.destroyed() && this.$cy.destroy();
      delete this.$cy;
    },
    beforeDestroy() {
      this.$cy && this.$cy.destroyed() && this.$cy.destroy();
      delete this.$cy;
    },
    watch: {},
    props: {},
    mounted() {
      // Cxtmenu圆形菜单主要依赖组件
      if (!cytoscape().cxtmenu) {
        cytoscape.use(cxtmenu);
        cytoscape.use(cola);
        cytoscape.use(avsdf);
        cytoscape.use(coseBilkent);
      }

      this.$cy = cytoscape({
        // initial viewport state:
        zoom: 1, // 图表的初始缩放级别.可以设置options.minZoom和options.maxZoom设置缩放级别的限制.
        pan: {x: 0, y: 0}, // 图表的初始平移位置.
        // interaction options:
        minZoom: 1e-50, // 图表缩放级别的最小界限.视口的缩放比例不能小于此缩放级别.
        maxZoom: 1e50, // 图表缩放级别的最大界限.视口的缩放比例不能大于此缩放级别.
        zoomingEnabled: true, // 是否通过用户事件和编程方式启用缩放图形.
        userZoomingEnabled: true, // 是否允许用户事件(例如鼠标滚轮,捏合缩放)缩放图形.对此缩放的编程更改不受此选项的影响.
        panningEnabled: true, // 是否通过用户事件和编程方式启用平移图形.
        userPanningEnabled: true, // 是否允许用户事件(例如拖动图形背景)平移图形.平移的程序化更改不受此选项的影响.
        boxSelectionEnabled: true, // 是否启用了框选择(即拖动框叠加,并将其释放为选择).如果启用,则用户必须点击以平移图表.
        selectionType: 'single', // 一个字符串，指示用户输入的选择行为.对于'additive',用户进行的新选择将添加到当前所选元素的集合中.对于'single',用户做出的新选择成为当前所选元素的整个集合.
        touchTapThreshold: 8, // 非负整数,分别表示用户在轻击手势期间可以在触摸设备和桌面设备上移动的最大允许距离.这使得用户更容易点击.
                              // 这些值具有合理的默认值,因此建议不要更改这些选项,除非您有充分的理由这样做.大值几乎肯定会产生不良后果.
        desktopTapThreshold: 4, // 非负整数,分别表示用户在轻击手势期间可以在触摸设备和桌面设备上移动的最大允许距离.这使得用户更容易点击.
                                // 这些值具有合理的默认值,因此建议不要更改这些选项,除非您有充分的理由这样做.大值几乎肯定会产生不良后果.
        autolock: false, // 默认情况下是否应锁定节点(根本不可拖动,如果true覆盖单个节点状态).
        autoungrabify: false, // 默认情况下节点是否不允许被拾取(用户不可抓取,如果true覆盖单个节点状态).
        autounselectify: false, // 默认情况下节点是否允许被选择(不可变选择状态,如果true覆盖单个元素状态).
        // rendering options:
        headless: false, // true:空运行,不显示不需要容器容纳.false:显示需要容器容纳.
        styleEnabled: true, // 一个布尔值,指示是否应用样式.
        hideEdgesOnViewport: true, // 渲染提示,设置为true在渲染窗口时,不渲染边.例如,移动某个顶点时或缩放时,边信息会被临时隐藏,移动结束后,边信息会被执行一次渲染.由于性能增强,此选项现在基本上没有实际意义.
        hideLabelsOnViewport: true, // 渲染提示,当设置为true使渲染器在平移和缩放期间使用纹理而不是绘制元素时,使大图更具响应性.由于性能增强,此选项现在基本上没有实际意义.
        textureOnViewport: true, // 渲染提示,当设置为true使渲染器在平移和缩放期间使用纹理而不是绘制元素时,使大图更具响应性.由于性能增强,此选项现在基本上没有实际意义.
        motionBlur: true, // 渲染提示,设置为true使渲染器使用运动模糊效果使帧之间的过渡看起来更平滑.这可以增加大图的感知性能.由于性能增强,此选项现在基本上没有实际意义.
        motionBlurOpacity: 0.2, // 当motionBlur:true,此值控制运动模糊帧的不透明度.值越高,运动模糊效果越明显.由于性能增强,此选项现在基本上没有实际意义.
        wheelSensitivity: 0.3, // 缩放时更改滚轮灵敏度.这是一个乘法修饰符.因此,0到1之间的值会降低灵敏度(变焦较慢),而大于1的值会增加灵敏度(变焦更快).
        pixelRatio: 'auto', // 使用手动设置值覆盖屏幕像素比率(1.0建议,如果已设置).这可以通过减少需要渲染的有效区域来提高高密度显示器的性能,
                            // 尽管在最近的浏览器版本中这是不太必要的.如果要使用硬件的实际像素比,可以设置pixelRatio: 'auto'(默认).
        // DOM容器,决定内容展示的位置,方式一(原生):document.getElementById('xx'),方式二(jQuery):$('#xx')
        container: document.getElementById('cytoscape_id'),
        // 一个指定布局选项的普通对象.
        layout: {name: 'random'},
      });
      // Cxtmenu圆形菜单--开始
      this.$cy.cxtmenu({
        menuRadius: 80, // the radius of the circular menu in pixels
        selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
        commands: (element) => {
          return [
            {
              fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
              content: '<span class="fa fa-flash fa-2x">操作1</span>', // html/text content to be displayed in the menu
              contentStyle: {}, // css key:value pairs to set the command's css in js if you want
              select: function (ele) { // a function to execute when the command is selected
                alert(ele.id()); // `ele` holds the reference to the active element
              },
              enabled: true, // whether the command is selectable
            },
            {
              fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
              content: '<span class="fa fa-flash fa-2x">操作2</span>', // html/text content to be displayed in the menu
              contentStyle: {}, // css key:value pairs to set the command's css in js if you want
              select: function (ele) { // a function to execute when the command is selected
                alert(ele.id()); // `ele` holds the reference to the active element
              },
              enabled: true, // whether the command is selectable
            },
            {
              // fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
              content: '操作3', // html/text content to be displayed in the menu
              // contentStyle: {}, // css key:value pairs to set the command's css in js if you want
              select: (ele) => alert(ele.id()),  // a function to execute when the command is selected
              enabled: true, // whether the command is selectable
            },
            {
              // fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
              content: '禁用', // html/text content to be displayed in the menu
              // contentStyle: {}, // css key:value pairs to set the command's css in js if you want
              select: (ele) => alert(ele.id()),  // a function to execute when the command is selected
              enabled: false, // whether the command is selectable
            }
          ]
        },
        fillColor: 'rgba(0, 0, 0, 0.75)', // 指令默认颜色(the background colour of the menu)
        activeFillColor: 'rgba(1, 105, 217, 0.75)', // 所选指令的颜色(the colour used to indicate the selected command)
        activePadding: 10, // additional size in pixels for the active command
        indicatorSize: 14, // the size in pixels of the pointer to the active command
        separatorWidth: 4, //连续命令之间的空白间隔(以像素为单位)
        spotlightPadding: 10, //元素和聚光灯之间的额外间距(以像素为单位)
        minSpotlightRadius: 10, // the minimum radius in pixels of the spotlight
        maxSpotlightRadius: 14, // the maximum radius in pixels of the spotlight
        openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
        itemColor: 'white', // 各指令元素内字体颜色
        itemTextShadowColor: 'red', // 各指令元素内字体阴影颜色
        zIndex: 9999, // the z-index of the ui div
        atMouse: true, // draw menu at mouse position
      });
      //Cxtmenu圆形菜单--结束
      // 不同节点的样式
      this.$cy
        .style()
        .selector('.classes-A')
        .style({'background-color': '#FF0000', 'border-color': '#FF0000', 'border-width': "1px",})
        .selector('.classes-B')
        .style({'background-color': '#00FF00', 'border-color': '#00FF00', 'border-width': "1px",})
        .selector('.classes-C')
        .style({'background-color': '#0000FF', 'border-color': '#0000FF', 'border-width': "1px",})
        .selector('.classes-D')
        .style({'background-color': '#E0E0E0', 'border-color': '#E0E0E0', 'border-width': "1px",})
      ;
      // 通用的样式
      this.$cy.style()
        /*未选择节点样式*/
        .selector('node')
        .style({'label': 'data(name)', 'font-size': '10pt', 'width': '8pt', 'height': '8pt'})
        /*已选择节点样式*/
        .selector('node:selected')
        .style({'border-color': '#c84e40', 'border-width': "1px",})
        /*未选择节点样式*/
        .selector('edge')
        .style({
          'label': 'data(name)',
          'target-arrow-shape': 'triangle-backcurve', /*箭头样式*/
          'target-arrow-size': '1px', /*箭头大小*/
          'target-arrow-color': '#999999', /*箭头颜色*/
          'curve-style': 'bezier', /*线条样式曲线*/
          'line-color': '#999999', /*线条颜色*/
          'width': '1px', /*线条宽度*/
          'font-size': '10px', /*标签字体大小*/
          'color': '#000000', /*标签字体大小*/
          'text-outline-color': 'white', /*文本轮廓颜色*/
          'text-outline-width': '1px', /*文本轮廓宽度*/
          'text-rotation': 'autorotate', /*标签方向*/
        })
        /*已选择节点样式*/
        .selector('edge:selected')
        .style({
          'color': '#3165fc', /*标签字体大小*/
          'target-arrow-color': '#61bffc', /*箭头颜色*/
          'line-color': '#61bffc', /*线条颜色*/
        })
      ;
    },
    data() {
      return {}
    },
    methods: {
      /**
       * eles : Array or Map.
       * node_eg: {group: 'nodes', data: {id: 'nid1', name: 'name1', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       * edge_eg: {group: 'edges', data: {id: 'eid1', name: 'name1', source: 'A', target: 'B', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       * node_eg: [
       *   {group: 'nodes', data: {id: 'nid1', name: 'name1', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       *   {group: 'nodes', data: {id: 'nid2', name: 'name2', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       * ];
       * edge_eg: [
       *   {group: 'edges', data: {id: 'eid1', name: 'name1', source: 'nid1', target: 'nid2', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       *   {group: 'edges', data: {id: 'eid2', name: 'name1', source: 'nid2', target: 'nid3', label: 'l1 l2', others: 'others'}, classes: 'like label', position: {x: 100, y: 100}};
       * ];
       * @param eles 元素集合.
       */
      addEles(eles) {
        if (eles) {
          this.$cy.startBatch();
          this.$cy.batch(() => {
            let elements = ((Array.isArray ? Array.isArray(eles) : null != eles && eles instanceof Array) ? eles : [eles]);
            let filterElements = elements.filter(__ => !this.$cy.getElementById(__.data.id).length)
            this.$cy.add(filterElements);
          });
          this.$cy.endBatch();
        }
      },
      /**
       * 删除选择的内容(可能是顶点, 也可能是关系)
       */
      delEles() {
        this.$cy.startBatch();
        this.$cy.batch(() => {
          let selectedEles = this.$cy.elements(':selected');
          // 未选择不进行操作
          if (!selectedEles || 1 > selectedEles.length) {
            return false;
          }
          selectedEles.remove();
        });
        this.$cy.endBatch();
      },
    },
  }
</script>
