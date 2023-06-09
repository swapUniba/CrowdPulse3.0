import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import isEqual from 'lodash.isequal';

import {Box, Flex, SegmentedControl, Text} from '@mantine/core';
import {FiltersContext} from '../index';

interface IProps {
    disableAllLabel: boolean | undefined
}

const AlgorithmFilterBox:React.FC<IProps> = ({disableAllLabel = false}) => {
    const { t } = useTranslation();
    const {filters, setFilters} = useContext(FiltersContext);

    const onChange = (value: string) => {
        const newFilters = {...filters, algorithm: value};
        setFilters(isEqual(filters, newFilters) ? filters : newFilters);
    }

    return <Box
        sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            textAlign: 'center',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            height: '100%'
        })}>
        <Flex
            gap='md'
            justify='center'
            align='center'
            direction='row'
            wrap='wrap'>
            <Text><b>{t('tab.filters.algorithm.algorithm')}</b></Text>
            <SegmentedControl
                style={{flex: 'fit-content'}}
                onChange={onChange}
                data={disableAllLabel ? [
                    {label: t('tab.filters.algorithm.sentIt'),     value: 'sent-it'},
                    {label: t('tab.filters.algorithm.feelIt'),     value: 'feel-it'},
                    {label: t('tab.filters.algorithm.hateSpeech'), value: 'hate-speech'}
                ] : [
                    {label: t('tab.filters.algorithm.all'),    value: 'all'},
                    {label: t('tab.filters.algorithm.sentIt'), value: 'sent-it'},
                    {label: t('tab.filters.algorithm.feelIt'), value: 'feel-it'},
                    {label: t('tab.filters.algorithm.hateSpeech'), value: 'hate-speech'}
                ]}
                defaultValue={filters ? filters.algorithm : undefined}/>
        </Flex>
    </Box>
}

export default AlgorithmFilterBox;