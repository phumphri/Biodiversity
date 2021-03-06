function plot_sample_guage(sampleid) {

    Plotly.purge('gauge_chart')

    url = "https://" + window.location.host +  "/wfreq/" + sampleid

    d3.json(url, function (error, response) {

        if (error) {
            console.log("d3.json failed.")
            return console.warn(error);
        }

        // Plotly.purge('gauge_chart');

        var level = response["WFREQ"]
        console.log("level:")
        console.log(level)


        // Enter a speed between 0 and 180
        var level = level * 18
        if (level == 90) {level = level - 5}

        // Trig to calc meter point
        var degrees = 180 - level,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX, space, pathY, pathEnd);

        var data = [{
            type: 'scatter',
            x: [0], y: [0],
            marker: { size: 28, color: '850000' },
            showlegend: false,
            name: 'speed',
            text: level,
            hoverinfo: 'text+name'
        },
        {
            values: [50 / 6, 50 / 6, 50 / 6, 50 / 6, 50 / 6, 50 / 6, 50],
            rotation: 90,
            text: ['10+', '8-9', '6-7', '4-5', '2-3', '0-1', ''],
            textinfo: 'text',
            textposition: 'inside',
            marker: {
                colors: ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                    'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                    'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                    'rgba(255, 255, 255, 0)']
            },
            labels: ['10+', '8-9', '6-7', '4-5', '2-3', '0-1', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
        }];

        var layout = {
            shapes: [{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
            }],
            autosize: true,
            xaxis: {
                zeroline: false, showticklabels: false,
                showgrid: false, range: [-1, 1]
            },
            yaxis: {
                zeroline: false, showticklabels: false,
                showgrid: false, range: [-1, 1]
            }
        };

        Plotly.newPlot('gauge_chart', data, layout);

    });
}
