let window_location_hostname = window.location.hostname
let window_location_port = window.location.port
var url = ""

if (window_location_hostname = "127.0.0.1") {
    url = "http://"
} else {
    url = "https://"
}

// url = "http://"
url = url + window_location_hostname + ":"
url = url + window_location_port
url = url + "/names"


console.log("url in dropdown_menu.js:")
console.log(url)

window.onload = function () {


    d3.json(url, function (error, response) {

        if (error) {
            console.log("d3.json failed.")
            print("d3.json failed.")
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
