import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import './Map.css'
import 'mapbox-gl/dist/mapbox-gl.css';

import articleService from '../services/articles'
import Icon from '../media/pin.png'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = (props) => {
    const points = articleService.useMapPoints(props.articleId)
    const map = null
    const mapContainer = useRef(null);
    const [boxToCenter, setBoxToCenter] = useState(null) 

    useEffect(() => {
        if(points.length > 1){
            const boundingBox = points.reduce((finalBox, point) => {
                return [
                    [
                        Math.min(Number(point.longitude), Number(finalBox[0][0])),
                        Math.min(Number(point.latitude), Number(finalBox[0][1]))
                    ],
                    [
                        Math.max(Number(point.longitude), Number(finalBox[1][0])),
                        Math.max(Number(point.latitude), Number(finalBox[1][1]))
                    ]
                ]
            }, [[points[0].longitude, points[0].latitude] , [points[0].longitude, points[0].latitude]])
            setBoxToCenter(boundingBox)
        }
    }, [points])

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
        const initMap = ({mapContainer}) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                height: 400,
                width: 100,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: points && points.length === 1 ? [points[0].longitude, points[0].latitude] : [0, 0],
                zoom: 11
              })

              
            map.on('load', () => {
                // setMap(map)
                map.resize()

                map.loadImage(
                    Icon,
                    (error, image) => {
                        if (error) throw error
                        map.addImage('pin', image)
                        map.addSource('markersSource', {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': points.map(point => {
                                    return {
                                        'type':'Feature',
                                        'geometry': {
                                            'type': 'Point',
                                            'coordinates': [point.longitude, point.latitude]
                                        },
                                        'properties': {
                                            'title': point.name
                                        }
                                    }
                                })
                            }
                        })

                        map.addLayer({
                        'id': 'markers',
                        'type': 'symbol',
                        'source': 'markersSource',
                        'layout': {
                            'icon-image': 'pin',
                            'icon-size': 0.10,
                            'icon-anchor': 'bottom-left',
                            'icon-allow-overlap': true,
                            'text-allow-overlap': true,
                            'text-field': ['get', 'title'],
                            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                            'text-offset': [0, 0.2],
                            'text-anchor': 'top'
                            }
                        })


                        if(boxToCenter){
                            map.fitBounds(boxToCenter, {
                                padding: 50
                            })
                        }
                    }
                )
            })
        }

        if(!map) initMap({mapContainer})
    }, [map, points, boxToCenter]) 

    useEffect(()=> {
        const credits = document.getElementsByClassName("mapboxgl-control-container")
        while(credits && credits.length > 0){
            credits[0].parentNode.removeChild(credits[0])
        }
    })

  return (
    <div className="map" ref={mapContainer} />
  )
}

export default Map