import React from 'react'

class Fetch extends React.Component<{}, { json: string | null }> {
    state = {
        json: null,
    }

    _isMounted = false

    componentDidMount() {
        this.callFetch()
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    callFetch = async () => {
        const response = await fetch('http://localhost:3000/json')
        const content = await response.json()

        if (this._isMounted) {
            this.setState({ json: JSON.stringify(content) })
        }
    }

    render() {
        return <div>{this.state.json}</div>
    }
}

export default Fetch
