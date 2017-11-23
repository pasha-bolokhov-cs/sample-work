#
# "Graph" Perl Module
# Author: Pasha Bolokhov <pasha.bolokhov@gmail.com>
#

package _________::Controller::Graph;

use JSON;
use base _________::Core;

sub process {
	my ($self, $params) = @_;

	##
	## Specify the template file
	##
	$self->{template} = "tmpl/graph.tmpl";

	return 1;
}

1;
