class EditorTools extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTool: 'brush'
    }
  }

  toolComponents() {
    return {
      'brush': <Brush {...this.props}/>,
      'sprayPaint': <SprayCan {...this.props}/>,
      'glitchFilters': <GlitchFilters {...this.props}/>
    }
  }

  activeToolComponent() {
    return this.toolComponents()[this.state.activeTool]
  }

  isActive(tool) {
    if(this.state.activeTool === tool) {
      return 'isActive'
    } else {
      return ''
    }
  }

  // THESE SHOULD BE ROUTES
  changeToBrush() {
    if(!(this.state.activeTool === 'brush')) {
      this.props.artBoard.currentDrawTool = 'paint';
      this.setState({ activeTool: 'brush' })
    }
  }

  changeToSprayCan() {
    if(!(this.state.activeTool === 'sprayPaint')) {
      this.props.artBoard.currentDrawTool = 'sprayPaint';
      this.setState({ activeTool: 'sprayPaint' })
    }
  }

  changeToGlitchFilters() {
    if(!(this.state.activeTool === 'glitchFilters'))  {
      this.setState({ activeTool: 'glitchFilters' })
    }
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td
              className={this.isActive('brush')}
              onClick={this.changeToBrush.bind(this)}>
              Brush
            </td>
            <td
              className={this.isActive('sprayPaint')}
              onClick={this.changeToSprayCan.bind(this)}>
              Spray Can
            </td>
          </tr>
          <tr>
            <td
              className={this.isActive('glitchFilter')}
              onClick={this.changeToGlitchFilters.bind(this)}>
              Glitch Filters
            </td>
          </tr>
        </table>
        <div>
          {this.activeToolComponent()}
        </div>
      </div>
    )
  }
}

this.EditorTools = EditorTools

