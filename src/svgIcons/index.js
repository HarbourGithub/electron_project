const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const svgList = require.context('./icons', false, /\.svg$/)
requireAll(svgList)