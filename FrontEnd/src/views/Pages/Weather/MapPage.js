/**
 * Created by ivan on 23.06.18.
 */

import React, { Fragment } from 'react';
import styled from '@emotion/styled';

import WeatherPage from '../PageHOC';
import Map from './Map';
import WeatherCard from './WeatherCard';
import Carousel from '../../components/carousel/Carousel';
import { Loader } from '../../components/Loaders';
import Error from '../../components/Error';

const CarouselWrapper = styled(Loader)` 
  min-height: 110px;
`;

const MapPage = props => {
    const { list, city, request, error, getWeather } = props;

    return (
        <Fragment>
            <Map
                onClick={getWeather}
                popupText={city.name}
                coord={city.coord}
            />
            <CarouselWrapper showLoader={request}>
                <Carousel>
                    {list.map((day) => <WeatherCard day={day} key={day.date} />)}
                </Carousel>
            </CarouselWrapper>

            <Error error={error} />
        </Fragment>
    );
};

export default WeatherPage(MapPage);