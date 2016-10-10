import Alt from 'alt';
import makeFinalStore from 'alt-utils/lib/makeFinalStore';


class Flux extends Alt {
	constructor(config) {
		super(config);

		this.FinalStore = makeFinalStore(this);
	}
}

// Singleton flux instance:
// webpack caches the exported module value, so consecutive requires will
// not result in the creation of more Flux instances
const flux = new Flux();

export default flux;
