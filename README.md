# marked-mermaid
<!-- Description -->

# Usage
<!-- Show most examples of how to use this extension -->

```js
import {marked} from "marked";
import markedMermaid from "marked-mermaid";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-mermaid/lib/index.umd.js"></script>

const options = {
	// |default options|
};

marked.use(markedMermaid(options));

marked.parse("|example markdown|");
// <p>|example html|</p>
```

## `options`

<!-- If there are no options you can delete this section -->
