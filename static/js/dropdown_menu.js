
url = "https://" + window.location.host + "/names"

window.onload = function () {


    d3.json(url, function (error, response) {

        if (error) {
            console.log("d3.json failed.")
            return console.warn(error);
        }

        d3.select("body")
            .select(".row")
            .select(".col-lg-3")
            .select(".panel")
            .select(".panel-body")
            .select(".dropdown")
            .select(".dropdown-menu")
            .selectAll("li")
            .data(response)
            .enter()
            .append("li")
            .text(function (d) { return d; })
            .attr("class", "text-center")
            .on("click", function (d, i) {
                select_sample_metadata(d)
                plot_sample_pie(d)
                plot_sample_guage(d)
                plot_sample_bubble(d)
            });


    })


}
