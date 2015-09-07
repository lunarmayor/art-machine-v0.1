let filters = [
  { display: 'lava world',name: 'lavaworld'},
  { display: 'aquafier', name: 'aquafier'},
  { display: 'dark gravity', name: 'darkGravity'},
  { display: 'light gravity', name: 'lightGravity'},
  { display: 'time 1', name: 'new'},
  { display: 'grainz', name: 'newnew'},
  { display: 'slicer', name: 'slicer'},
  { display: 'neon melt', name: 'random'},
  { display: 'vertical dispersal', name: 'newnews'},
  { display: 'stripes', name: 'crusher'},
  { display: 'electric shift', name: 'blueGreenMeltDown'},
  { display: 'split face', name: 'splitFace'},
  { display: 'messy invert', name: 'messyInvert' },
]

let pixelSorters = [
  { display: 'black light', name: 'blackLight' },
  { display: 'black medium', name: 'blackMed' },
  { display: 'black heavy', name: 'blackHev' },
  { display: 'brightness light', name: 'brightLight' },
  { display: 'brigtness medium', name: 'brightMed' },
  { display: 'birghtness heavy', name: 'brightHev' },
  { display: 'columns', name: 'sortColumns' },
  { display: 'rows', name: 'sortRows' },
]

class GlitchFilters extends React.Component {
  constructor(props) {
    super(props)
   }

  render() {
    let glitchFilters = filters.map((filter) => {
      return <GlitchFilter {...this.props} display={filter.display} name={filter.name}/>
    })

    let sortFilters = pixelSorters.map((filter) => {
      return <SortFilter {...this.props} display={filter.display} name={filter.name}/>
    })

    return (
      <div>
        <div className="">
          <h5>glitch filters</h5>
          <ul>
            { glitchFilters }
          </ul>
          <h5>pixel sorters</h5>
          <ul>
            { sortFilters }
          </ul>
        </div>
      </div>
    )
  }
}

this.GlitchFilters = GlitchFilters
