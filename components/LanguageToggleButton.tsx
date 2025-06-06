import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useLanguageStore } from '../stores/languagesStore';
import { Container, LangText, Separator } from '@/styled/languageToggleButton';

const LanguageToggleButton: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();

  return (
    <Container>
      <TouchableOpacity onPress={() => setLanguage('en')}>
        <LangText selected={language === 'en'}>EN</LangText>
      </TouchableOpacity>
      <Separator>/</Separator>
      <TouchableOpacity onPress={() => setLanguage('es')}>
        <LangText selected={language === 'es'}>ES</LangText>
      </TouchableOpacity>
    </Container>
  );
};

export default LanguageToggleButton;
