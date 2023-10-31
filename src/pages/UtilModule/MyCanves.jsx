import { useEffect, useState } from "react"
import ReactECharts from 'echarts-for-react';
import 'echarts-gl';
import { Col, Row } from "antd";

const MyCanves = (props) => {

    const { result } = props;

    const [option1, setOption1] = useState({
        title: {
            text: '结果饼图',
            left: 'left'
        },
        tooltip: {
            trigger: 'item'
        },
        color: ['#fc8251', '#5470c6', '#9A60B4', '#ef6567', '#f9c956', '#3BA272'],
        series: [
            {
                name: '结果',
                type: 'pie',
                radius: '50%',
                data: [],
            }
        ]
    });

    const [option4, setOption4] = useState({
        title: {
            text: '结果柱状图',
            left: 'left'
        },
        xAxis: {
            type: 'category',
            data: ['样本一', '样本二']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    })

    const option2 = {
        tooltip: {},
        backgroundColor: '#fff',
        visualMap: {
            show: false,
            dimension: 2,
            min: -1,
            max: 1,
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            }
        },
        xAxis3D: {
            type: 'value'
        },
        yAxis3D: {
            type: 'value'
        },
        zAxis3D: {
            type: 'value'
        },
        grid3D: {
            viewControl: {
                // projection: 'orthographic'
            }
        },
        series: [
            {
                type: 'surface',
                wireframe: {
                    // show: false
                },
                equation: {
                    x: {
                        step: 0.05
                    },
                    y: {
                        step: 0.05
                    },
                    z: function (x, y) {
                        if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
                            return '-';
                        }
                        return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
                    }
                }
            }
        ]
    };

    const option3 = {
        title: {
            text: 'Stacked Area Chart'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };

    useEffect(() => {
        if (Array.isArray(result) && typeof result[0] === 'number') {
            let newResult1 = [];
            let newResult4 = result;
            result.forEach(e => {
                newResult1.push({ value: e < 0 ? -e : e, name: e });
            });
            let newOption1 = JSON.parse(JSON.stringify(option1));
            newOption1.series[0].data = newResult1;
            setOption1(newOption1);

            let newOption4 = JSON.parse(JSON.stringify(option4));
            newOption4.series[0].data = newResult4;
            setOption4(newOption4);
        }
    }, [])

    return <div id="canvas">
        <Row>
            <Col span={6} xs={12} sm={12} lg={12} xl={8}>
                <ReactECharts
                    option={option1}
                    notMerge={true}
                />
            </Col>
            <Col span={6} xs={12} sm={12} lg={12} xl={8}>
                <ReactECharts
                    option={option2}
                    notMerge={true}
                />
            </Col>
            <Col span={6} xs={12} sm={12} lg={12} xl={8}>
                <ReactECharts
                    option={option3}
                    notMerge={true}
                />
            </Col>
            <Col span={6} xs={12} sm={12} lg={12} xl={8}>
                <ReactECharts
                    option={option4}
                    notMerge={true}
                />
            </Col>
        </Row>
    </div>
}

export default MyCanves;
