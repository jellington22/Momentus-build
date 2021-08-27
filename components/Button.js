import styled from '@emotion/native';
import {
  border,
  space,
  fontSize,
  color,
  variant,
} from 'styled-system';

const buttonSize = variant({
  prop: 'size',
  key: 'buttonSizes',
});

const Button = styled.TouchableOpacity(
  border,
  buttonSize,
  space,
  fontSize,
  color,
);

Button.defaultProps = {
}

export default Button;
