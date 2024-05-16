import React from "react";

class ErrorBoundary extends React.Component<{}, { error: null, errorInfo: null }> {
    constructor(props: any) {
        super(props);
        this.state = {error: null, errorInfo: null};
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            error: error, errorInfo: errorInfo,
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (<main
                    className="relative flex flex-grow flex-col bg-[center_top] bg-no-repeat"
                    style={{backgroundSize: "100% auto"}}
                >
                    <div className="relative flex flex-grow flex-col px-5">
                        <div
                            className="container relative mx-auto flex flex-grow flex-col rounded-lg text-left bg-[#FFFEFB] px-3 py-4 lg:p-10"
                            style={{boxShadow: "rgba(0,0,0,.075) 0px 4px 10px 4px"}}
                        >
                            <div className="mx-auto max-w-4xl">
                                <div className="mb-5 font-intermedium text-[24px]">
                                    You got an error 😭
                                </div>
                                <div className="mb-2">
                                    {this.state.error && this.state.error.toString()}
                                </div>
                                <details style={{whiteSpace: "pre-wrap", fontSize: "12px"}}>
                                    {this.state.errorInfo.componentStack}
                                </details>
                            </div>
                        </div>
                    </div>
                </main>);
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
