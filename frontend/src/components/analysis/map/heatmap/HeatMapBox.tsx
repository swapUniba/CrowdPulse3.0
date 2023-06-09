import React, {useContext, useEffect, useMemo} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet'
import {ColorScheme, Loader, useMantineColorScheme} from '@mantine/core';

import {HeatmapLayerFactory} from '@vgrid/react-leaflet-heatmap-layer';

import MapPanel, {Position} from '../MapPanel';
import HeatMapDataPanel from './HeatMapDataPanel';
import {HeatMapContext} from '../index';

const DARK_MAP_URL  = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
const LIGHT_MAP_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';

const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>()

/*
 * Force the AnalysisMap component to change the background color
 * when the theme is changed.
 */
const changeMapBackgroundColor = (colorScheme: ColorScheme) => {
    const mapElement = document.getElementById('AnalysisMap');

    if (mapElement) {
        mapElement.style.backgroundColor = colorScheme === 'dark' ? '#222327' : '#D0CFD3';
    }
}

const HeatMapBox = () => {

    const { colorScheme } = useMantineColorScheme();
    const heatMapData = useContext(HeatMapContext);

    const points = useMemo(() => {
        const points: [number, number, number][] = [];

        if (heatMapData) {
            heatMapData.forEach(current => {

                for (let c = 0 ; c < current.count ; c++) {
                    points.push([current.coordinates.latitude, current.coordinates.longitude, 1]);
                }

            });
        }

        return points;
    }, [heatMapData]);


    useEffect(() => {
        changeMapBackgroundColor(colorScheme);
    }, [colorScheme]);

    return heatMapData && points
        ? <MapContainer
            id='AnalysisMap'
            style={{
                backgroundColor: colorScheme === 'dark' ? '#222327' : '#D0CFD3',
                height: `${window.innerHeight / 1.25}px`,
                width: '90%',
                marginBottom: '200px'}}
            center={[42.500, 12.900]}
            zoom={5}
            //maxZoom={7}
            minZoom={3}
            scrollWheelZoom={true}>
            <TileLayer url={colorScheme === 'dark' ? DARK_MAP_URL : LIGHT_MAP_URL}/>
            <HeatmapLayer
                aggregateType={'mean'}
                opacity={0.75}
                radius={40}
                points={points}
                latitudeExtractor={m => m[0]}
                longitudeExtractor={m => m[1]}
                intensityExtractor={(m) => m[2]} />
            <MapPanel position={[Position.TOP, Position.RIGHT]} content={<HeatMapDataPanel/>}/>
        </MapContainer>
        : <Loader/>

}

export default HeatMapBox;