import React from 'react'

class Fetch extends React.Component<{}, { json: string | null }> {
    state = {
        json: null,
    }

    componentDidMount() {
        this.callFetch()
    }

    callFetch = async () => {
        const response = await fetch('http://localhost:3000/json')
        this.setState({ json: JSON.stringify(await response.json()) })
    }

    render() {
        return <div>{this.state.json}</div>
    }
}

export default Fetch
