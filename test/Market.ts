import { ethers } from 'hardhat'
import { Market } from '../typechain/Market'
import { Market__factory  } from '../typechain/factories/Market__factory'
import { Token } from '../typechain/Token'
import { Token__factory } from '../typechain/factories/Token__factory'
import { expect } from 'chai'
import exp from 'constants'

describe('Market', () => {
    let deployer
    let marketFactory
    let market: Market
    let tokenFactory
    let kiwi: Token
    let plum: Token

     before(async () => {
        [deployer] = await ethers.getSigners()
        marketFactory = new Market__factory(deployer)
        tokenFactory = new Token__factory(deployer)
        kiwi = await tokenFactory.deploy()
        plum = await tokenFactory.deploy()
        market = await marketFactory.deploy(kiwi.address, plum.address)
        await kiwi.approve(market.address, 2000)
        await plum.approve(market.address, 2000)
    })

    it('sets pointers', async () => {
        expect(await market.xToken()).to.equal(kiwi.address)
        expect(await market.yToken()).to.equal(plum.address)
    })

    it('supply', async () => {
        await expect(market.supply(1000, 2000)).to.emit(market, 'Supply').withArgs(1000, 2000)
        expect(await kiwi.balanceOf(market.address)).to.equal(1000)
        expect(await plum.balanceOf(market.address)).to.equal(2000)
    })

    it('trade', async () => {
        await market.trade(100)
        expect(await kiwi.balanceOf(market.address)).to.equal(1100)
        expect(await plum.balanceOf(market.address)).to.below(2000)
    })

    it('trade reverts on 0', async () => {
        await expect(market.trade(0)).to.be.revertedWith('amount is 0')
    })
})