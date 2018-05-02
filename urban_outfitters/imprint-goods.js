var goods = parcel.make({
    $type: "children",
    $key: ".dom-product-tile",
    items: {
        picture: {
            $type: "child",
            $key: ".js-product-tile__image-link img",
            $value: {
                $type: "attribute",
                $key: "src",
            }
        },
        name: {
            $type: "child",
            $key: ".c-product-tile__h3 span",
            $value: {
                $type: "text",
            }
        },
        price: {
            $type: "child",
            $key: ".c-product-meta__current-price",
            $value: {
                $type: "text",
            }
        },
        colors: {
            $type: "children",
            $key: ".o-list-swatches__li a",
            $value: {
                code: {
                    $type: "attribute",
                    $key: "data-color-code"
                },
                title: {
                    $type: "attribute",
                    $key: "title"
                },
                picture: {
                    $type: "child",
                    $key: "img",
                    $value: {
                        $type: "attribute",
                        $key: "src"
                    }
                }
            }
        },
        detailed: {
            $type: "async",
            $key: function(resolve, rj, stamp, source, resolver) {
                var launchButton = source.querySelector(".c-product-tile-controls a");
                if (document.body.querySelector(".dom-modals-anchor .o-modal")) {
                    this.wait(() => {
                        resolver.apply(this, arguments);
                    }, 0.5);
                    return;
                } else {
                    var callback = (callback) => {
                        var closeButton = document.querySelector(".dom-quickshop.s-quickshop.js-quickshop ~ .js-modal__close");
                        if (!document.body.querySelector(".o-carousel__slide img") || !closeButton) {
                            console.log("no image");
                            this.wait(() => {
                                callback(callback);
                            }, 0.5);
                            return;
                        }
                        var data = this.make({
                            $type: "child",
                            $key: ".dom-quickshop.s-quickshop.js-quickshop",
                            pictures: {
                                $type: "children",
                                $key: ".o-carousel__slide",
                                $value: {
                                    $type: "child",
                                    $key: "img",
                                    $value: {
                                        $type: "attribute",
                                        $key: "src"
                                    }
                                }
                            },
                            sizes: {
                                $type: "child",
                                $key: ".c-product-sizes__ul",
                                $value: {
                                    $type: "children",
                                    $key: ".c-radio-styled__small",
                                    $value: {
                                        $type: "child",
                                        $key: "label",
                                        $value: {
                                            $type: "text"
                                        }
                                    }
                                }
                            },
                            rating: {
                                $type: "async",
                                $key: function(resolve) {
                                    resolve(Math.floor(Math.random() * 5))
                                }
                            }
                        });
                        resolve(data);
                        console.log("close");
                        this.dispatch(closeButton, "click");
                    };
                    callback(callback);
                    this.dispatch(launchButton, "click");
                }
            }
        }
    },
})