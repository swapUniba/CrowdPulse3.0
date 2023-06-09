import React from 'react';
import {
    Image,
    Text,
    Button,
    Card,
    Group,
    Center
} from '@mantine/core';
import {AiFillDatabase} from 'react-icons/ai';
import {useTranslation} from 'react-i18next';

const bytesToKiloBytes = (bytes: number) => {
    return bytes / 1024;
}

const kiloBytesToMegaBytes = (kiloBytes: number) => {
    return kiloBytes / 1024;
}

interface IProps {
    database: any,
    onClick: () => void,
    isSelected: boolean
}

const DatabaseCard: React.FC<IProps> = ({database, onClick, isSelected}) => {
    const { t } = useTranslation();

    return (
        <Card shadow='xl'
              p='xl'
              radius='md'
              withBorder onClick={onClick}
              style={{ cursor: 'pointer', width: '250px', height: '350px' }}>
            <Card.Section>
                <Center>
                    { database.info.icon && <Image src={`data:image/jpeg;base64,${database.info.icon}`} width='150px' height='150px' alt={database.name}/>}
                    {!database.info.icon && <AiFillDatabase size='150px' />}
                </Center>
                <Group position='center' mt='md' mb='xs'>
                    <Text weight={700}>{database.name}</Text>
                </Group>
            </Card.Section>

            <Text size='sm' color='dimmed'>
                <small><b>{t('releaseDate')}</b>: {database.info.releaseDate ? database.info.releaseDate.toString() : t('notDefined')}</small><br/>
                <small><b>{t('lastUpdate')}</b>: {database.info.lastUpdateDate ? database.info.lastUpdateDate.toString() : t('notDefined')}</small><br/>
                <small><b>{t('version')}</b>: {database.info.version ? database.info.version : t('notDefined')}</small><br/>
                <small><b>{t('sizeOnDisk')}</b>: {kiloBytesToMegaBytes(bytesToKiloBytes(database.sizeOnDisk)).toFixed(2)} MB</small>
            </Text>

            <Button variant='light' color={isSelected ? 'red' : 'green'} fullWidth mt='md' radius='md'>
                {isSelected ? t('deselect') : t('select')}
            </Button>
        </Card>
    );
}

export default DatabaseCard;