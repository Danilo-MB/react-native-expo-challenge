import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useLanguageStore } from '../stores/languagesStore';
import { Container, LangText, Separator } from '@/styled/languageToggleButton';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const LanguageToggleButton: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();
  const navigation = useNavigation();

  return (
    <Container>
      {navigation.canGoBack() ?
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name='arrow-back' size={20} color='black' />
        </TouchableOpacity>
        :
        <>
          <TouchableOpacity onPress={() => setLanguage('en')}>
            <LangText selected={language === 'en'}>EN</LangText>
          </TouchableOpacity>
          <Separator>/</Separator>
          <TouchableOpacity onPress={() => setLanguage('es')}>
            <LangText selected={language === 'es'}>ES</LangText>
          </TouchableOpacity>
        </>
      }
    </Container>
  );
};

export default LanguageToggleButton;
