module Transits

using Reexport

export AbstractLimbDark,
       PolynomialLimbDark,
       IntegratedLimbDark,
       SecondaryLimbDark,
       compute,
       Orbits

include("orbits/Orbits.jl")
@reexport using .Orbits
using .Orbits: AbstractOrbit

include("limbdark/limbdark.jl")

end
