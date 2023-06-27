export let TDM1_AUC = {
    data: response[0].map(d=>{
      return {
          x: d.TDM1_auc,
          y: d.ERBB2_expression,
          r: 3,
          _info: d
      }
    }),
    title: "T-DM1",
    rootId: "plot-1",
    display:{ legend: false, title: false, borderbox: false, xTitle: true, yTitle: true }
  };


  export let TMMAE_AUC = {
    data: response[1].map(d=>{
    return {
        x: d.Trastuzumab_MMAE_auc,
        y: d.ERBB2_expression,
        r: 3,
        _info: d
    }
  }),
  title: "T-MMAE",
  rootId: "plot-2" ,
  display:{ legend: false, title: false, borderbox: false, xTitle: true, yTitle: false }
};

export let TDM1_GE = {
  data: response[2].map(d=>{
  return {
      x: d.coef,
      y: d.qval,
      r: 3,
      _info: d
  }
}),
title: "T-MD1:  GE dependency for ERBB2",
rootId: "plot-3" ,
display:{ legend: false, title: false, borderbox: false, xTitle: true, yTitle: false }
};

export let TMMAE_GE = {
  data: response[3].map(d=>{
  return {
      x: d.coef,
      y: d.qval,
      r: 3,
      _info: d
  }
}),
title: "T-MMAE: GE dependency for ERBB2",
rootId: "plot-4" 
};


export let TDM1_shRNA = {
  data: response[4].map(d=>{
  return {
      x: d.coef,
      y: d.qval,
      r: 3,
      _info: d
  }
}),
title: "T-MD1: shRNA dependency for ERBB2",
rootId: "plot-5" 
};


export let TMMAE_shRNA = {
  data: response[5].map(d=>{
  return {
      x: d.coef,
      y: d.qval,
      r: 3,
      _info: d
  }
}),
title: "T-MMAE: shRNA dependency for ERBB2",
rootId: "plot-6" ,
}


export function useVolcanoConfig(config){
  let colorScale =  {
    x: d3.scaleSequential().interpolator(d3.interpolateHcl("purple", "#ffd46e")).domain(d3.extent(config.data.map(d=>d.x))),
    y: d3.scaleSequential().interpolator(d3.interpolateHcl("#ffd46e", "purple")).domain(d3.extent(config.data.map(d=>d.y)))
  } 
  config.data.forEach(d=>{
    d.color = colorScale.y(d.y)
  })
  config.axis = {
    x: {
        min: -1,
        max: 1,
        title: "Correlation"
    },
    y: {
        min: 0,
        max: 40,
        title: "-log10 (q value)"
    }
  }
}



export let volcanoConfig = {
  axis: {
    x: {
        min: -1,
        max: 1,
        title: "Correlation"
    },
    y: {
        min: 0,
        max: 40,
        title: "-log10 (q value)"
    }
  },
}