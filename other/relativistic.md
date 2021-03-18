A New Redshift-Distance Relation


Many years ago I found a trick that could in a sense mimic the expansion of space in a physics model. It's based on the fact that as space expands, the travel time to any galaxy in the universe increases. One consequence of the expansion of space is, loosely speaking, the expansion of time: increasing distances mean increasing durations. 

To demonstrate this, here's a model of targets placed in space 100 million light years apart. A beam of light is emitted, and in the static universe (blue) the light reaches a new target every 100 million years, while in an expanding universe (white), the photon is lagging behind. 

gif

The trick is, rather than place everything in the physics model in motion away from everything else, these time delays could be exactly reproduced by just slowing down the photon (green).

In a simple expanding universe, everything moves away from the observer at v=HD. In this mock-expansion model, the photon's velocity is v=c-HD. This just moves HD from one velocity to another. These models also produce the exact same redshifts as each other, for the same value of H.

The code for calculating the time delays and redshifts is here: [Modeling Expansion](modeling_expansion.htm)

Recently, the question of exacly how fast space is expanding has received a lot of attention. The current expansion rate seems to be faster than it was in the past.

With that in mind, I considered the mock-expansion idea and different ways to change it. The photon in these models begins with a velocity of c that decreases by HD as it travels. Something similar happens if, rather than subtract HD from c, you divide c by 1 + HD. At first, when D=0, v=c/(1+0), which is v=c. As HD gets bigger, v gets smaller.

Hubble's constant usually has units of km/s/Mpc, which works out to units of inverse time. Those units no longer work for v=c/(1+HD). This requires new units that are of inverse distance. 

By putting variations on a theme, I devised similar but different mathematical models to compare:

* hypothesis 1: v=c-HD
* hypothesis 2: v=c/(1+HD)
* hypothesis 3: v=c/(1+HD)^2
* hypothesis 4: v=c/(1+(HD)^2)

When graphed, the time delays and redshifts in all four are, as expected, different from each other. 

img


The next step was to compare these hypotheses against the obserational data. For that I found the Supernovae Cosmology Project's data. I converted the distance modulus to co-moving distance, and ran models for the hypotheses and showed the results against the observational data. The inverse square variation, hypothesis 3, is a very good fit of the data, for H=0.04 Gly^-1. 

img

This mock-expansion idea, though, violates a fair amount of the established laws of physics. The question then became, how could this inverse square version of mock-expansion be convereted into an actual expansion model? The answer to this question is that objects in the universe are moving away at velocity v = c - c / (1 + HD)^2. Such a universe, however, cannot exist. If the expansion of space is not linear, then different observers will determine the same part of space to be expanding at different rates.

Although the inverse square variation looked promising for a moment, it appears to be a dead end.

---

A Radical Proposal

When initially discovered, the mock-expansion had the photon beginning it's journey moving at c, and over millions of years, decelerate. This would mean that a photon from a galaxy with z=1 woudl arrive to us traveling at 0.5c. In addition to being directly in violation of special relativity, a slow moving photon would wreak havoc on the physics of reflection, which would be observed in the images of the Hubble Space Telescope, which it is not.

There is a way for such a hypothesis to be consistent with estbalished physics, although it is very counter-intuitive. The solution is that D is not the distance the light has traveled; D is the distance to the observer. 

It works like this. If you emit a beam a light that travels out into space and out of the galaxy, that light will actually decelerate relative to you. However, as the observer, the opposite is observed. The photon begins moving slowly, and then accelerates toward the observer, reaching c in the observer's frame of reference only when the light is at distance D=0 from the observer.

This sounds logically impossible, and under the standard assumptions, it is. An underlying assumption in relativity is that, in the absence of gravity, two clocks should always tick at the same rate if the are stationary relative to each other. A clock on Earth should tick at the same rate as a clock 1 million light years away, or 100 billion light years aways, so long as they are at rest with respect to each other.

The interpretation of the observed redshifts proposed is that due to an until now unrecognized principle of nature, an observers clock runs at "full speed", while distant clocks do not, they lag behind at a rate of 1/(1+z). To illustrate, if a giant clock was placed at a distance of z=1 and was observable by a giant telescope on Earth, according to this interpretation, the distant clock would be ticking at half speed compared to a clock on Earth.
 
If an event where to take 1 second and produce a wave of 1 hz, an observer at distance z=1 would perceive the event to take 2 seconds, due to their clock moving twice as fast as clocks where the event takes place. The frequency observed from a distance then, would be once every 2 seconds, or 0.5 hz. In this interpretation, when the light is emitted, in the frame of reference of an observer at z=1, it would be moving at 0.5 c with a frequency of 0.5 hz. As the light travels to the observer, and the distance to the observer decreases, the frequency will stay the same, but the speed will go up according to v=c/(1+HD)^2. This in turn will elongate the light's wavelength. The frequency and energy never change, but the speed and wavelength increase to the familiar values when they reach an observer.

---

An Updated Redshift-Distance Relation

While the idea of a photon that decelerates when it moves away from you, and accelerates when it moves toward you might seem bizzare, hypothesis 3 yields a relationship between redshift and distance that can be practically applied to empircal data with minimal effort. The hypothesis recall is:

    v = c / (1 + HD)^2

When used to calculate redshifts, the standard pattern arises that at z=1, v=0.5c, and at z=2, v=0.333c, and so on, such that:

    v = c / (1 + z)

Therefore:

    c / (1 + z) = c / (1 + HD)^2

    1 + z = (1 + HD)^2

    sqrt(1 + z) = 1 + HD

Solving for D we get:

    D = (sqrt(1 + Z) - 1) / H

And Solving for z we get:

    1 + z = 1 + 2HD + HD^2

    z = HD^2 + 2HD

These formula predict the observed z and D of a galaxy in an expanding universe that is accelerating, without a cosmological constant or dark energy.

---

Problems

The expanding theory of the universe does much more than explain the redshifts, and any alternative explanation to an expanding universe is deemed a failure if it cannot explain a whole host of phenomena that are attributed to an expanding universe, from the Cosmic Microwave Background, to the creation of nucleons and light elements at the beginning of time. As such, the hypothesis presented here faces a difficult road ahead. 

Additionally, this hypothesis that every observer perceives a spacetime where time and the forces of nature fall off with distance, places them in a somewhat special place in the universe. Since all observers in the universe should observe the same kind of universe whereever they are, then each observer would apparently have their own spacetime. This somewhat defeats the purpose of relativity. The solution, perhaps, would come in the form of a slightly "more general" theory of relativity, a mathematical framework that can prdouce the seemingly bespoke spacetimes of each observer. 

---

Conclusion

Whether the strange interpretation of redshifts given here, with the change to Hubble's law and the units of its constant it entails, are deemed physically possibleo or mathematically necessary to explain the universe we observe, the approach does produce a new redshift-distance relationshp that fits the modern evidence. By correlating redshifts with units of inverse distance rather than inverse time, the redshifts don't increase as rapidly, producing a natural fit to the acceleration of the expansion of the universe.

The value for Hubble's constant then, is reported to be H=0.04 Gly^-1. This value does not need to change with time or require the concept of dark energy to fit to the data. 





http://supernova.lbl.gov/Union/figures/SCPUnion2.1_mu_vs_z.txt   
