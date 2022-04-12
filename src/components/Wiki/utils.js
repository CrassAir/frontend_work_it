import lang from "suneditor/src/lang";

export const SEOptionsEdit = {
    "mode": "classic",
    "minHeight": "calc(100vh - 214px)",
    "lang": lang.ru,
    "rtl": false,
    // "plugins": plugins,
    "defaultStyle": "font-family: Arial; font-size: 14px; color:#525c69;background:#fafafa;max-height:70vh;",
    // "imageGalleryUrl": "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
    "pasteTagsWhitelist": "p|p.id|id|span|span.id",
    "attributesWhitelist": {
        "all": "id|style",
        "p": "style|text-align",
        "span": "id"
    },
    "videoFileInput": false,
    "tabDisable": false,
    "buttonList": [
        [
            "undo",
            "redo",
            "font",
            "fontSize",
            "formatBlock",
            // "paragraphStyle",
            "blockquote",
            "bold",
            "underline",
            "italic",
            "strike",
            "subscript",
            "superscript",
            "fontColor",
            "hiliteColor",
            "textStyle",
            "removeFormat",
            "outdent",
            "indent",
            "align",
            "horizontalRule",
            "list",
            "lineHeight",
            "table",
            "link",
            "image",
            "save",
            // "video",
            // "imageGallery",
            // "fullScreen",
            // "showBlocks",
            // "codeView",
            // "preview",
            "print",
        ]
    ],
}

export const SEOptionsView = {
    "mode": "classic",
    "pasteTagsWhitelist": "p",
    "minHeight": "calc(100vh - 162px)",
    "attributesWhitelist": {
        "all": "style",
        "p": "style|text-align|font-family",
    },
    // "defaultStyle": "font-size: 16px;color:#525c69;background:#fafafa;",
    "defaultStyle": "font-family: Arial; font-size: 14px; color:#525c69;background:#fafafa",
    "lang": lang.ru,
    "resizingBar": false,
    "showPathLabel": false,
    "buttonList": [
        [
            "print",
        ]
    ],
}