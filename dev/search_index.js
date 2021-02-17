var documenterSearchIndex = {"docs":
[{"location":"gettingstarted/#Getting-Started","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"gettingstarted/#Usage","page":"Getting Started","title":"Usage","text":"","category":"section"},{"location":"gettingstarted/","page":"Getting Started","title":"Getting Started","text":"using Transits\n\norbit = SimpleOrbit(period=3, duration=1)\nu = [0.4, 0.26] # quad limb dark\nld = PolynomialLimbDark(u)\n\nt = range(-1, 1, length=1000) # days from t0\nrs = range(0, 0.2, length=10) # radius ratio\n\nfluxes = @. ld(orbit, t, rs')","category":"page"},{"location":"gettingstarted/","page":"Getting Started","title":"Getting Started","text":"(Image: )","category":"page"},{"location":"gettingstarted/#Integrated-and-Secondary-Curves","page":"Getting Started","title":"Integrated and Secondary Curves","text":"","category":"section"},{"location":"gettingstarted/","page":"Getting Started","title":"Getting Started","text":"IntegratedLimbDark can be used to numerically integrate each light curve exposure in time","category":"page"},{"location":"gettingstarted/","page":"Getting Started","title":"Getting Started","text":"ld = IntegratedLimbDark([0.4, 0.26])\norbit = SimpleOrbit(period=3, duration=1)\nt = range(-1, 1, length=1000)\ntexp = [0.1 0.2 0.3]\n# no extra calculations made\nflux = @. ld(orbit, t, 0.2)\n# use quadrature to find time-averaged flux for each t\nflux_int = @. ld(orbit, t, 0.2, texp) ","category":"page"},{"location":"gettingstarted/","page":"Getting Started","title":"Getting Started","text":"(Image: )","category":"page"},{"location":"gettingstarted/","page":"Getting Started","title":"Getting Started","text":"SecondaryLimbDark can be used to generate secondary eclipses given a surface brightness ratio","category":"page"},{"location":"gettingstarted/","page":"Getting Started","title":"Getting Started","text":"ld = SecondaryLimbDark([0.4, 0.26], brightness_ratio=0.1)\nld_int = IntegratedLimbDark(ld) # composition works flawlessly\n\norbit = SimpleOrbit(period=4, duration=1)\nt = range(-1.25, 2.75, length=1000)\nrs = range(0.01, 0.1, length=6)\n\nf = @. ld(orbit, t, rs')\nf_int = @. ld_int(orbit, t, rs', texp=0.3)","category":"page"},{"location":"gettingstarted/","page":"Getting Started","title":"Getting Started","text":"(Image: )","category":"page"},{"location":"gettingstarted/#Using-Units","page":"Getting Started","title":"Using Units","text":"","category":"section"},{"location":"gettingstarted/","page":"Getting Started","title":"Getting Started","text":"Units from Unitful.jl are a drop-in substitution for numbers","category":"page"},{"location":"gettingstarted/","page":"Getting Started","title":"Getting Started","text":"using Unitful\norbit = SimpleOrbit(period=10u\"d\", duration=5u\"hr\")\nt = range(-6, 6, length=1000)u\"hr\"\nflux = @. ld(orbit, t, 0.1)","category":"page"},{"location":"api/#API/Reference","page":"API/Reference","title":"API/Reference","text":"","category":"section"},{"location":"api/#Index","page":"API/Reference","title":"Index","text":"","category":"section"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"","category":"page"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"AbstractLimbDark\n(AbstractLimbDark)(args...; kwargs...)\nPolynomialLimbDark\nQuadLimbDark\nIntegratedLimbDark\nSecondaryLimbDark\ncompute\ncompute(::AbstractLimbDark, ::Orbits.AbstractOrbit, t, r)","category":"page"},{"location":"api/#Transits.AbstractLimbDark","page":"API/Reference","title":"Transits.AbstractLimbDark","text":"AbstractLimbDark\n\nA limb dark law need only need to implement compute(::Law, b, r) to extend the limb darkening interface.\n\nSee also\n\ncompute\n\n\n\n\n\n","category":"type"},{"location":"api/#Transits.AbstractLimbDark-Tuple","page":"API/Reference","title":"Transits.AbstractLimbDark","text":"(::AbstractLimbDark)(b, r)\n\nAn alias for calling compute\n\nExamples\n\njulia> ld = PolynomialLimbDark([0.4, 0.26]);\n\njulia> ld(0, 0.01)\n0.9998785437247428\n\n\n\n\n\n","category":"method"},{"location":"api/#Transits.PolynomialLimbDark","page":"API/Reference","title":"Transits.PolynomialLimbDark","text":"PolynomialLimbDark(u::AbstractVector)\n\nPolynomial limb darkening using analytical integrals. The length of the u vector is equivalent to the order of polynomial used; e.g., [0.2, 0.3] corresponds to quadratic limb darkening.\n\nMathematical form\n\nI(mu) propto 1 - u_1(1-mu) - u_2(1-mu)^2 - dots - u_N(1-mu)^N\n\nwhich is equivalent to the series\n\nI(mu) propto -sum_i=0^Nu_i(1-mu)^i\n\nwith the definition u_0 equiv -1.\n\nExamples\n\nu = [0.4, 0.26] # quadratic and below is 100% analytical\nld = PolynomialLimbDark(u)\nld(0.1, 0.01)\n\n# output\n0.9998787880717668\n\nu2 = vcat(u, ones(12) ./ 12)\nld2 = PolynomialLimbDark(u2)\nld2(0.1, 0.01)\n\n# output\n0.9998740059086433\n\nReferences\n\nAgol, Luger, Foreman-Mackey (2020)\"Analytic Planetary Transit Light Curves and Derivatives for Stars with Polynomial Limb Darkening\"\n\nLuger et al. (2019)\"starry: Analytic Occultation Light Curves\"\n\n\n\n\n\n","category":"type"},{"location":"api/#Transits.QuadLimbDark","page":"API/Reference","title":"Transits.QuadLimbDark","text":"QuadLimbDark(u::AbstractVector)\n\nA specialized implementation of PolynomialLimbDark with a maximum of two terms (quadratic form). This has a completely closed-form solution without any numerical integration. This means there are no intermediate allocations and reduced numerical error.\n\nMathematical form\n\nI(mu) propto 1 - u_1(1-mu) - u_2(1-mu)^2\n\nwarning: Higher-order terms\nHigher-order terms will be ignored; no error will be thrown\n\nExamples\n\nld = QuadLimbDark(Float64[]) # constant term only\n\nb = [0, 1, 2] # impact parameter\nr = 0.01 # radius ratio\nld.(b, r)\n\n# output\n3-element Vector{Float64}:\n 0.9999\n 0.9999501061035608\n 1.0\n\nld = QuadLimbDark([0.4, 0.26]) # max two terms\nld.(b, r)\n\n# output\n3-element Vector{Float64}:\n 0.9998785437247428\n 0.999974726693709\n 1.0\n\nReferences\n\nSee references for PolynomialLimbDark\n\n\n\n\n\n","category":"type"},{"location":"api/#Transits.IntegratedLimbDark","page":"API/Reference","title":"Transits.IntegratedLimbDark","text":"IntegratedLimbDark(limbdark; N=21, basis=:legendre)\nIntegratedLimbDark(u; kwargs...)\n\nComputes the time-averaged flux in the middle of an exposure by wrapping a limb darkening law limbdark with a quadrature scheme. For each time step t, N extra points are super-sampled from t-texp/2 to t+texp/2and the time-averaged flux is calculated via quadrature.\n\nIf a set of limb darkening coefficients, u, is provided, a PolynomialLimbDark law will be used by default.\n\nMathematical form\n\nbarF(t) = frac1Delta tint_t-Delta t  2^t+Delta t  2F(t)dt\n\nwhere F is the wrapped limb darkening law and Delta t is the exposure time.\n\nQuadrature\n\nThe integration is approximated via Guassian quadrature\n\nfrac1Delta t intF(t)dt approx frac12sum_i^Nw_i * F(fracDelta t2xi_i + t)\n\nwhere the weights w_i and nodes ξ_i are defined by the given quadrature rule. The nodes are defined by evaluating orthogonal polynomials N times between -1 and 1. Notice the change of interval required to go from the natural bounds of the orthogonal polynomial basis, -1, 1, to the range defined by the exposure time.\n\nThe following bases are available from FastGaussQuadrature.jl. In addition, a function can be passed which calculates nodes, weights = f(N).\n\n:legendre - Legendre polynomial base on the open (-1, 1)\n:radau - Legendre polynomial base on the semi-open [-1, 1) interval\n:lobatto - Legendre polynomial base on the closed [-1, 1] interval\n\n\n\n\n\n","category":"type"},{"location":"api/#Transits.SecondaryLimbDark","page":"API/Reference","title":"Transits.SecondaryLimbDark","text":"SecondaryLimbDark(primary::AbstractLimbDark,\n                  secondary::AbstractLimbDark; \n                  brightness_ratio=1)\nSecondaryLimbDark(u_p::AbstractVector, u_s=u_p; kwargs...)\n\nCompose two limb darkening laws together to add a secondary eclipse. If vectors of coefficients are provided, laws will automatically be constructed using PolynomialLimbDark. The surface brightness ratio is given in terms of the host; e.g., if the companion is half as bright as the host, the ratio would be 0.5.\n\nnote: Interface\nSecondaryLimbDark only works with an orbit, since the companion's reference frame needs to be calculated. This means you can't call it using an impact parameter like ld(b, r) directly.\n\nMathematical form\n\nf(t r) = frac2f_p(t r) + eta r^2 f_s(t r)1 + f_p(t r) + eta r^2 f_s(t r)\n\nwhere f_p is to the primary flux, f_s is to the secondary flux, and eta is the surface brightness ratio. t and r correspond to the time and radius ratio from the companion's reference frame.\n\nExamples\n\n# equal size and limb darkening\nr = 1.0\nu = [0.4, 0.26]\n# companion is 1/10 as bright\nbrightness_ratio = 0.1\nld = SecondaryLimbDark(u; brightness_ratio)\norbit = SimpleOrbit(period=2, duration=0.5)\nfp = ld(orbit, 0, r) # primary egress\nfs = ld(orbit, 1, r) # secondary egress\n\nfp ≈ brightness_ratio * fs\n\n# output\ntrue\n\n\n\n\n\n","category":"type"},{"location":"api/#Transits.compute","page":"API/Reference","title":"Transits.compute","text":"compute(::AbstractLimbDark, b, r; kwargs...)\n\nCompute the relative flux for the given impact parameter b and radius ratio r. The impact parameter is unitless. The radius ratio is given in terms of the host; e.g., if the companion is half the size of the host, r=0.5.\n\n\n\n\n\n","category":"function"},{"location":"api/#Transits.compute-Tuple{AbstractLimbDark,Transits.Orbits.AbstractOrbit,Any,Any}","page":"API/Reference","title":"Transits.compute","text":"compute(::AbstractLimbDark, orbit::AbstractOrbit, t, r)\n\nCompute the relative flux by calculating the impact parameter at time t from the given orbit. The time needs to be compatible with the period of the orbit, nominally in days.\n\nExamples\n\njulia> ld = PolynomialLimbDark([0.4, 0.26]);\n\njulia> orbit = SimpleOrbit(period=3, duration=1);\n\njulia> ld(orbit, 0, 0.1) # primary egress\n0.9878664434953113\n\njulia> ld(orbit, 0.1, 0.1) # 0.1 d\n0.9879670695533511\n\nthis works effortlessly with libraries like Unitful.jl\n\njulia> using Unitful\n\njulia> orbit = SimpleOrbit(period=3u\"d\", duration=3u\"hr\");\n\njulia> ld(orbit, 0u\"d\", 0.1)\n0.9878664434953113\n\n\n\n\n\n","category":"method"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"SimpleOrbit\nOrbits.relative_position","category":"page"},{"location":"api/#Transits.Orbits.SimpleOrbit","page":"API/Reference","title":"Transits.Orbits.SimpleOrbit","text":"SimpleOrbit(; period, duration, t0=0, b=0, r_star=1)\n\nCircular orbit parameterized by the basic observables of a transiting system.\n\nParameters\n\nperiod - The orbital period of the planets, nominally in days\nduration The duration of the transit, same units as period\nt0 - The midpoint time of the reference transit, same units as period\nb - The impact parameter of the orbit\nr_star - The radius of the star, nominally in solar radii\n\n\n\n\n\n","category":"type"},{"location":"api/#Transits.Orbits.relative_position","page":"API/Reference","title":"Transits.Orbits.relative_position","text":"relative_position(::AbstractOrbit, t)\n\n\n\n\n\n","category":"function"},{"location":"bench/#Benchmarks","page":"Benchmarks","title":"Benchmarks","text":"","category":"section"},{"location":"bench/","page":"Benchmarks","title":"Benchmarks","text":"Transits.jl aims to be at least as fast as similar tools. Limbdark.jl is also written in Julia and Agol et al. (2020) showed it outperforms starry, PyTransit, and batman in both runtime speed and numerical accuracy. The following benchmarks are works in progress, but they already show a marginal improvement on the Limbdark.jl implementation.","category":"page"},{"location":"bench/#Setup","page":"Benchmarks","title":"Setup","text":"","category":"section"},{"location":"bench/","page":"Benchmarks","title":"Benchmarks","text":"warning: Warning\nThese benchmarks are works in progress","category":"page"},{"location":"bench/","page":"Benchmarks","title":"Benchmarks","text":"The code can be found in bench/. You'll need to set up the environment yourself, including the installation of Limbdark.jl.","category":"page"},{"location":"bench/#Performance","page":"Benchmarks","title":"Performance","text":"","category":"section"},{"location":"bench/","page":"Benchmarks","title":"Benchmarks","text":"(Image: )","category":"page"},{"location":"bench/#Comparison-with-Limbdark.jl","page":"Benchmarks","title":"Comparison with Limbdark.jl","text":"","category":"section"},{"location":"bench/","page":"Benchmarks","title":"Benchmarks","text":"(Image: )","category":"page"},{"location":"bench/","page":"Benchmarks","title":"Benchmarks","text":"","category":"page"},{"location":"bench/","page":"Benchmarks","title":"Benchmarks","text":"(Image: )","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = Transits","category":"page"},{"location":"#Transits.jl","page":"Home","title":"Transits.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: GitHub) (Image: Build Status) (Image: Coverage)","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: License) (Image: DOI)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Transits.jl provides flexible and powerful occultation curves with limb darkening. The goals of this package are, in this order","category":"page"},{"location":"","page":"Home","title":"Home","text":"have a simple interface with high compasibility\nbe flexible with respect to numeric types and application\nbe fully compatible with ChainRules.jl automatic differentiation (AD) system to leverage the derived analytical gradients\nprovide a codebase that is well-organized, instructive, and easy to extend\nmaintain high performance: at least as fast as similar tools","category":"page"},{"location":"","page":"Home","title":"Home","text":"In particular, PolynomialLimbDark implements the \"starry\" limb darkening method, which solves the flux integral analytically. This provides floating-point errors and runtimes that are best in class.","category":"page"},{"location":"#Citations","page":"Home","title":"Citations","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"If you use Transits.jl or a derivative of it in your work please consider citing it with the Zenodo DOI. If you use PolynomialLimbDark or QuadLimbDark please also cite Agol et al. (2020) and Luger et al. (2019).","category":"page"}]
}
