import * as d3 from "d3";
// import $ from "jquery";

d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

  d3.selection.prototype.moveToBack = function() {  
    return this.each(function() { 
        var firstChild = this.parentNode.firstChild; 
        if (firstChild) { 
            this.parentNode.insertBefore(this, firstChild); 
        } 
    });
};


export default class lineplot {
    constructor(
        config
    ) { 
        this.data = config.data;
        this.title = config.title;
        this.axis = config.axis;
        this.rootId = config.rootId;
        this.dimension = config.dimension; 
        this.padding = config.padding;    
    
        this.updateDimensions(); 
        this.createScale();
        this.render()
    }
    updateDimensions() {
        this.dimension.innerWidth = this.dimension.width - this.padding.left - this.padding.right;
        this.dimension.innerHeight = this.dimension.height - this.padding.top - this.padding.bottom;
    }
    createScale(){
        this.scale = {
            x: d3.scaleLog().domain([this.axis.x.min, this.axis.x.max]).range([0, this.dimension.innerWidth]).nice(),
            y: d3.scaleLinear().domain([this.axis.y.min, this.axis.y.max]).range([this.dimension.innerHeight, 0]).nice()
        }
    }
    render(){
        const self = this;
        d3.select(`#${this.rootId}-g`).remove();

        let svg =  d3.select(`#${self.rootId}`)
            .append("g")
            .attr("id", `${self.rootId}-g`)
            .attr("class", "scatter-plot")
            .attr("transform", `translate(${self.padding.left}, ${self.padding.top})`)

        let series = svg.selectAll(".series")
            .data(self.data)
            .enter()
            .append("g")
            .attr("class", "series")
            .each(function(d){
             
                let path = d3.groups(d.data, e=> e.x).map(e=>{
                    return{
                        x: e[0],
                        y: d3.mean(e[1], f=> f.y)
                    }
                })
             


            d3.select(this).selectAll("circle")
                .data(d.data)
                .enter()
                .append("circle")
                .attr("fill", d.color)
                .attr("r", 2)
                .attr("cx", e=> self.scale.x(e.x))
                .attr("cy", e=> self.scale.y(e.y))
 
                d3.select(this)
                .append("path")
                .datum(path)
                .attr("fill", "none")
                .attr("stroke", d.color)
                .attr("stroke-width", 1.5)
                .attr("d", 
                    d3.line()
                        .x(function(e) { 
                            return self.scale.x(e.x) 
                        })
                        .y(function(e) { 
                        return self.scale.y(e.y) 
                        })
                        .curve(d3.curveNatural)
                )
        
            })

            self._axis()
            self._title()
            self._legend()

    }

    _axis(){
        const self = this;
        const svg = d3.select(`#${this.rootId}-g`),
        tickPadding = 15;

        const renderAxisX=()=>{
            const x = d3.axisBottom()
                .scale(self.scale.x)   
                .ticks(5)
                .tickPadding(tickPadding)
                .tickSize(0)
               .tickSizeInner(-self.dimension.innerHeight);

                svg.append("g")
                .attr("class", "axis axis x")
                .attr("transform", `translate(0,${self.dimension.innerHeight})`)
                .call(x)

                svg.append("text")
                    .attr("class", "axis title")
                    .attr("x", self.dimension.innerWidth/2)
                    .attr("y",  self.dimension.innerHeight + (self.padding.bottom))
                    .attr("text-anchor", "middle")
                    .html(self.axis.x.title)
            
        }
        const renderAxisY=()=>{
            const y = d3.axisLeft(self.scale.y) 
                .ticks(5) 
                .tickPadding(tickPadding)
                .tickSize(0)
                .tickSizeInner(-self.dimension.innerWidth)

            svg.append("g")
                .attr("class", "axis axis y")
                .attr("transform", `translate(0,0)`)
                .call(y)
            
            svg.append("text")
                .attr("class", "axis title")
                .attr("transform", `translate(${-self.padding.left},${ self.dimension.innerHeight/2})rotate(-90)`)
                .attr("dy", "1em")
                .attr("text-anchor", "middle")
                .html(self.axis.y.title)

        }
        renderAxisX()
        renderAxisY()
    }
    _title(){
        const self = this;
        const svg = d3.select(`#${self.rootId}-g`)
        svg
            .append("text")
            .attr("class", "title")
            .attr("transform", `translate(${self.dimension.innerWidth/2}, 0)`)
            .attr("dy", -14)
            .attr("text-anchor", "middle")
            .html(this.title)
    }
    // this should be custom code, not part of line plot (unless it is given a config)
    _legend(){

        const self = this;
        const padding = { top: 20, right: self.padding.right, bottom: 50, left: self.padding.left}
        const svg = d3.select(`#${self.rootId}-legend`)
        const dimension =  {
            innerWidth: svg.node().clientWidth - padding.left - padding.right,
            innerHeight: svg.node().clientHeight - padding.top - padding.bottom
        }

        let legendScale = d3.scaleBand().domain(self.axis.color.domain()).range([0, dimension.innerWidth]).padding(.1)
        let legend = svg.append("g").attr("id", "legend").attr("transform", `translate(${padding.left}, ${[padding.top]})`)


        legend.selectAll("rect")
        .data(self.axis.color.domain())
        .enter()
        .append("rect")
        .attr("x", d=> legendScale(d))
        .attr("y", 0)
        .attr("width", legendScale.bandwidth())
        .attr("height", dimension.innerHeight)
        .attr("fill", d=> self.axis.color(d))

        const x = d3.axisBottom()
        .scale(legendScale)   
        .tickPadding(5)
        .tickSize(0)

        legend.append("g")
        .attr("class", "axis axis x")
        .attr("transform", `translate(0,${dimension.innerHeight})`)
        .call(x)

        legend.append("text")
            .attr("class", "axis title")
            .attr("x", dimension.innerWidth/2)
            .attr("y",  dimension.innerHeight)
            .attr("dy", "2.5em")
            .attr("text-anchor", "middle")
            .html("Cell Ratio")
    
        legend.select(".domain").remove()

    }
}

