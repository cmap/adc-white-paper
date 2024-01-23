<template>
  <div>
    <svg id="matrix-svg1"></svg>
    <svg id="matrix-svg2"></svg>
  </div>

</template>
  
  <script>
  import * as d3 from 'd3';
// references: 
// https://gis.stackexchange.com/questions/98244/creating-multivariate-choropleth-map-with-diverging-color-schemes
// https://pro.arcgis.com/en/pro-app/latest/help/mapping/layer-properties/color-schemes.htm
// https://jakubnowosad.com/posts/2020-08-25-cbc-bp2/

// NOTE: define topL, topR, bottomL  and calc bottomR via interpolating  topR and bottomL
  export default {
    name: 'ColorMatrix',
    components: {

    },
    props:{

    },
    data: () => ({
      loading: false,
      colmat: null
    }),

     mounted() {
      let rowfirst = this.createColorRange([1,2,3,4,5,6], "viridis")
      let rowlast = this.createColorRange([1,2,3,4,5,6], "plasma")
    
      let PuGl = ["#E8E8E8", "#9972AF", "#804D36", "#C8B35A"]
      let YlGnPi = ["#F7F285", "#70C266", "#292770", "#EE0884"]
      let scheme = PuGl;
      let num  = 5;
    // this.colmat = this.colormatrix(rowfirst, rowlast);

      this.colmat = this.colormatrix_trbl(scheme[0], scheme[1], scheme[2], scheme[3], num);
      this.viewbivariate(this.colmat, "matrix-svg1");
      // this.viewbivariate(this.colmat, "matrix-svg2");
    },
    methods: {
      colormatrix(rowfirst, rowlast){
          let num = rowfirst.length,
              steps = num - 1; 
          let colmat = []; 
          d3.range(num).forEach(d=>{
              let temp = []; 
              d3.range(num).forEach(e=>{
                let r0 = rowfirst[d][0],
                    g0 = rowfirst[d][1],
                    b0 = rowfirst[d][2],

                    r1 = rowlast[d][0],
                    g1 = rowlast[d][1],
                    b1 = rowlast[d][2]; 
                let rchange = (r1-r0)/steps,
                    gchange=(g1-g0)/steps,
                    bchange=(b1-b0)/steps; 
                return temp.push(`rgb(${Math.round(r0+rchange*e)}, ${Math.round(g0+gchange*e)}, ${Math.round(b0+bchange*e)})`)
              })
              colmat.push(temp)
          })
          return colmat;
      },
      colormatrix_trbl(c1,c2,c3,c4,num=5){

        let c1r = d3.rgb(c1).r, c2r = d3.rgb(c2).r, c3r = d3.rgb(c3).r, c4r = d3.rgb(c4).r,
            c1g = d3.rgb(c1).g, c2g = d3.rgb(c2).g, c3g = d3.rgb(c3).g, c4g = d3.rgb(c4).g,
            c1b = d3.rgb(c1).b, c2b = d3.rgb(c2).b, c3b = d3.rgb(c3).b, c4b = d3.rgb(c4).b,
            steps = num - 1; 

        // row first, last 
        let rowfirst = [],
            rowlast = []; 

        // row first 
        // c1 top left, c4 bottom left
        d3.range(num).forEach(d=>{
          let rchange = (c4r - c1r)/steps,
              gchange = (c4g - c1g)/steps,
              bchange = (c4b - c1b)/steps; 
          return rowfirst.push([
            Math.round(c1r + rchange * d),
            Math.round(c1g + gchange * d),
            Math.round(c1b + bchange * d)
          ])
        })

        // row last: list of rgb arrays, lengh = num
        // c2 top right, c3 bottom right
        d3.range(num).forEach(d=>{
          let rchange = (c3r - c2r)/steps,
              gchange = (c3g - c2g)/steps,
              bchange = (c3b - c2b)/steps;
          return rowlast.push([
            Math.round(c2r + rchange * d),
            Math.round(c2g + gchange * d),
            Math.round(c2b + bchange * d)
          ])
        })

        let colmat = []; 
        d3.range(num).forEach(d=>{
            let temp = []; 
            d3.range(num).forEach(e=>{
              let r0 = rowfirst[d][0],
                  g0 = rowfirst[d][1],
                  b0 = rowfirst[d][2],
                  r1 = rowlast[d][0],
                  g1 = rowlast[d][1],
                  b1 = rowlast[d][2]; 
              let rchange = (r1-r0)/steps,
                  gchange=(g1-g0)/steps,
                  bchange=(b1-b0)/steps; 
              return temp.push(`rgb(${Math.round(r0+rchange*e)}, ${Math.round(g0+gchange*e)}, ${Math.round(b0+bchange*e)})`)
            })
            colmat.push(temp)
        })
        return colmat;
      },
      viewbivariate(bicolormat, rootId){
        let margin = {top:50,left:100,right:35,bottom:50},
        width  = 900 - margin.left - margin.right,
        height = 600 - margin.top  - margin.bottom;  
        let num = bicolormat.length, 
        sqlen = 20; 
          
        const svg = d3.select(`#${rootId}`)
        .attr("width", width)
        .attr("height", height);

        const g = svg.append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`); 
        
          g.selectAll('.rows')
          .data(d3.range(num))
          .enter().append('g')
          .attr('class','rows')
          .selectAll('.cols')
          .data(d=>{
              return d3.range(num).map(e=>{
              return([d,e])
            })  
          })
          .enter().append('rect')
          .attr('class','cols')
          .attr('x',d=>d[1]*sqlen)
          .attr('y',d=>d[0]*sqlen)
          .attr('width',sqlen)
          .attr('height',sqlen)
          .attr('fill',(d,i)=>{
              
              return bicolormat[d[0]][i]
          }); 
      },
      createColorRange(domain=['1', '2', '3', '4', '5'], colorTheme="viridis") {
        let arr = domain.map((d, i) => i + 1) // turn strings into numbers

        if (arr.length <= 2) {
            arr = [...Array(4).keys()].map((d, i) => i + 1) // if only 2 doses, turn into 4 doses so that color scale colors are not so far apart
        }
        let step = 0; // old / not in use
        let values = [];
        let max = d3.max(arr) + step;
        let min = step;
        let scale;
        if (colorTheme === "plasma") {
              scale = d3.scaleSequential(d3.interpolatePlasma).domain([max, min])
          } else if (colorTheme === "viridis") {
              scale = d3.scaleSequential(d3.interpolateViridis).domain([max, min])
          } else if (colorTheme === "inferno") {
              scale = d3.scaleSequential(d3.interpolateInferno).domain([max, min])
          }
          arr.forEach((d) => {
            let rgb = d3.rgb(scale(d + step))
            // let formatRgb = `rgb(${rgb.r},${rgb.g},${rgb.b})`
            let formatRgb = [rgb.r, rgb.g, rgb.b]
              values.push(formatRgb) // get list of evenly-spaced colors (light-dark)


          })
          return values
        }
      },
  }
  </script>
  
  <style scoped>

  </style>
  