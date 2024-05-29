import React, {useState} from 'react';
import PropTypes from "prop-types";

EditWebsite.propTypes = {
    code: PropTypes.string.isRequired
}

interface EditWebsite {
    code: string
}

function EditWebsite({code}: EditWebsite) {
    const [htmlCode, setHTMLCode] = useState<string>(code);
    return (
        <form>
            <textarea
                value={htmlCode}
                onChange={(e) => setHTMLCode(e.target.value)}
                style={{width: '100%', height: '400px'}}
            />
        </form>
    );
}

export default EditWebsite;