const sharedColors = {
  secondary: '#cabca4',
  border: '#999999',
  overlay50: 'rgba(0, 0, 0, 0.5)',
  white: '#ffffff',
  black: '#000000'
}
const lightColors = {
  ...sharedColors,
  primary: '#3d3424',
  background: '#ffffff',
  gradient: ['#ECC32D', '#F2AE2E', '#F27B35', '#F24C3D'],
  overlay10: 'rgba(0, 0, 0, 0.1)'
}
const darkColors = {
  ...sharedColors,
  primary: '#fdfdfc',
  background: '#000000',
  gradient: [
    'rgba(236,195,45,0.8)',
    'rgba(242,174,46,0.8)',
    'rgba(242,123,53,0.8)',
    'rgba(242,76,61,0.8)'
  ],
  overlay10: 'rgba(255, 255, 255, 0.1)'
}
export { lightColors, darkColors }
