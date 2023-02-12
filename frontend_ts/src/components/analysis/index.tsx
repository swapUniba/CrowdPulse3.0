import React, {useEffect, useState} from 'react';
import {useLocation, useSearchParams} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {Tabs} from '@mantine/core';

import {AiFillInfoCircle, AiFillFileWord, AiOutlineUnorderedList} from 'react-icons/ai';
import {MdSentimentSatisfiedAlt} from 'react-icons/md';
import {RiTimeLine} from 'react-icons/ri';
import {BsMap} from 'react-icons/bs';
import {FiSettings} from "react-icons/fi";

import InfoTab from './InfoTab';
import SentimentTab from './SentimentTab';
import WordTab from './WordTab';
import TimelineTab from './TimelineTab';
import TweetListTab from './TweetListTab';
import MapTab from './MapTab';


const Analysis = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [query] = useSearchParams();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (!reload) setReload(true);
        else window.location.reload();
    }, [location.search]);

    const dbs: string[] | undefined = query.getAll('dbs');

    return <Tabs variant='pills' defaultValue='info'>
        <Tabs.List>
            <Tabs.Tab value='info' icon={<AiFillInfoCircle size={14} />}>{t('info')}</Tabs.Tab>
            <Tabs.Tab value='sentiment' icon={<MdSentimentSatisfiedAlt size={14} />}>{t('sentiment')}</Tabs.Tab>
            <Tabs.Tab value='word' icon={<AiFillFileWord size={14} />}>{t('word')}</Tabs.Tab>
            <Tabs.Tab value='timeline' icon={<RiTimeLine size={14} />}>{t('timeline')}</Tabs.Tab>
            <Tabs.Tab value='tweet_list' icon={<AiOutlineUnorderedList size={14} />}>{t('tweetList')}</Tabs.Tab>
            <Tabs.Tab value='map' icon={<BsMap size={14} />}>{t('map')}</Tabs.Tab>
            <Tabs.Tab value='settings' icon={<FiSettings size={14} />} ml="auto">{t('settings')}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='info' pt='xs'><InfoTab dbs={dbs}/></Tabs.Panel>
        <Tabs.Panel value='sentiment' pt='xs'><SentimentTab dbs={dbs}/></Tabs.Panel>
        <Tabs.Panel value='word' pt='xs'><WordTab dbs={dbs}/></Tabs.Panel>
        <Tabs.Panel value='timeline' pt='xs'><TimelineTab dbs={dbs}/></Tabs.Panel>
        <Tabs.Panel value='tweet_list' pt='xs'><TweetListTab dbs={dbs}/></Tabs.Panel>
        <Tabs.Panel value='map' pt='xs'><MapTab dbs={dbs}/></Tabs.Panel>
    </Tabs>
}

export default Analysis;