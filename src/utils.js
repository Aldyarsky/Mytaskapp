import md5 from 'md5';

export const getQueryParams = (qs) => {
    qs = qs.split('+').join(' ');

    const params = {},
        re = /[?&]?([^=]+)=([^&]*)/g;
    let tokens;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

export const updateQueryStringParameter = (uri, key, value) => {
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
}

export const login = (login, password) => {
    return new Promise((resolve, reject) => {
        if (login === 'admin' && password === '123') {
            resolve();
            return;
        }
        reject();
    })
}
export const logout = (bool) => {
    return new Promise((resolve, reject) => {
        if (bool) {
            resolve();
            return;
        }
        reject();
    })
}

export const encodeRfc3986 = string => {
    return encodeURIComponent(string).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
    });
}

export const generateSignature = (params, token) => {
    const keys = Object.keys(params);
    keys.sort((a, b) => a.localeCompare(b));
    let stringForEncode = keys.reduce((acc, val) => {
        return acc + `${val}=${encodeRfc3986(params[val])}&`;
    }, '')
    stringForEncode += `token=${token}`;
    return md5(stringForEncode);
}
