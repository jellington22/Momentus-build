const baseTheme = {
  space: [0, 2, 4, 8, 16, 32],
  fontSizes: [14, 16, 18, 24, 32],
  colors: {
    blue: '#07c',
    tomato: 'tomato',
    purple: 'purple'
  }
}

const theme = {
  ...baseTheme,
  buttons: {
    primary: {
      color: 'white',
      backgroundColor: baseTheme.colors.blue
    },
    secondary: {
      color: 'white',
      backgroundColor: baseTheme.colors.purple
    },
    danger: {
      color: 'white',
      backgroundColor: baseTheme.colors.tomato
    }
  },
  buttonSizes: {
    medium: {
      fontSize: baseTheme.fontSizes[2],
      padding: `8px 16px`
    },
    large: {
      fontSize: baseTheme.fontSizes[4],
      padding: `16px 32px`
    }
  }
}

export default theme;
