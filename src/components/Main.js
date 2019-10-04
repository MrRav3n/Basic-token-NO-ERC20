import React from 'react'
    //Navbar with account address
    class Main extends React.Component{
        render() {
            return(
                <span>
                <h1 className="display-4 mt-5 text-center">Your current balance: {this.props.balance}</h1>
                <h1 className="display-4 mt-5 text-center">There is {this.props.tokensLeft} tokens left</h1>
                <form className="form-inline mt-5 d-flex justify-content-center "onSubmit={(event) => {
                    event.preventDefault();
                    let ammount = this.ammount.value;
                    this.props.sendTokens(ammount, this.address.value);
                }}>
                <div className="form-check form-check-inline" >
                    <input type="text" ref={(input) => this.ammount = input} className="form-control mr-2" placeholder="Ammount"/>
                    <input type="text" ref={(input) => this.address = input} className="form-control mr-2" placeholder="Address"/>
                    <button type="submit" className="btn btn-primary ">Send Tokens</button>
                </div>
                </form>
                <form className="form-inline mt-5 d-flex justify-content-center " onSubmit={(event) => {
                    event.preventDefault();
                    this.props.buyTokens(this.howMuch.value);
                }}>
                    <input type="text" ref={(input) => this.howMuch = input} className="form-control mr-2" placeholder="Ammount"/>
                    <button type="submit" className="btn btn-primary ">Buy tokens</button>
                </form>
                </span>
            );

        }
    }

export default Main
