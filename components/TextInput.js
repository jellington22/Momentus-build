import styled from '@emotion/native';
import {
  border,
  space,
  fontSize,
} from 'styled-system';

const TextInput = styled.TextInput(
  border,
  space,
  fontSize,
);

TextInput.defaultProps = {
  borderWidth: 1,
  padding: 2,
}

export default TextInput;
