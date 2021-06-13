import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { renderModelAttribute, renderExampleSchema } from "libs/render";

require("./index.scss");

export default class RequestBodyRender extends Component {
  static propTypes = {
    requestBody: PropTypes.object
  };

  static defaultProps = {
    requestBody: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      currentMode: "schema"
    };
  }

  changeMode(mode) {
    const { currentMode } = this.state;
    if (currentMode === mode) return;
    this.setState({ currentMode: mode });
  }

  render() {
    const { requestBody } = this.props;
    const { currentMode } = this.state;

    const contentType = requestBody.content && Object.keys(requestBody.content)[0];
    let schemElem;
    if (contentType) {
      if (currentMode === "schema") {
        schemElem = renderModelAttribute(null, requestBody.content[contentType].schema, { alwaysShowCurrent: true });
      }
      if (currentMode === "example") {
        schemElem = renderExampleSchema(requestBody.content[contentType].schema);
      }
    }
    return (
      <div className="RequestBodyRender">
        {schemElem &&
          <div className="mt-5">
            {/* Header */}
            <div className="gradientBorder mb-2">
              <p className="text-sm relative leading-none">Body</p>
            </div>

            {/* Content-type */}
            {contentType &&
              <p className="leading-tight text-sm grey-light py-2">
                {contentType}
              </p>
            }

            {/* Select example or schema */}
            <div className="flex items-center text-xs py-2">
              <p
                className={classnames("transition-20 cursor-pointer mr-2 py-1 px-3 rounded leading-none", {
                  "grey-light hover:opacity-75": currentMode !== "schema",
                  schemaActive: currentMode === "schema"
                })}
                onClick={this.changeMode.bind(this, "schema")}>
                Schema
              </p>
              <p
                className={classnames("transition-20 cursor-pointer py-1 px-3 rounded leading-none", {
                  "grey-light hover:opacity-75": currentMode !== "example",
                  exampleActive: currentMode === "example"
                })}
                onClick={this.changeMode.bind(this, "example")}>
                Example
              </p>
            </div>

            {/* Content */}
            <div className="text-sm grey -mt-1">
              {schemElem}
            </div>
          </div>
        }
      </div>
    );
  }
}
